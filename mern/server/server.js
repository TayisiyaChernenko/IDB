// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config({ path: "./config.env" });

// Set up default port or use environment variable
const PORT = process.env.PORT || 3000;
const Db = process.env.ATLAS_URI;

// Import Mongoose and the schema models
const mongoose = require('mongoose');
const Posts = require('./models/postModel');
const Users = require('./models/userModel');

// Create an Express app instance
const app = express();

// Middleware for handling JSON data and enabling CORS
app.use(bodyParser.json());
app.use(cors());

// Connect to the MongoDB database using Mongoose
mongoose.connect(Db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Register a new user
app.post('/discussions/register', async (req, res) => {
  var newUser = new Users({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });
  try {
    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: 'Error during registration' });
  }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
  var newPost = new Posts({
    text: req.body.text,
    courseName: req.body.courseName,
    sectionNum: req.body.sectionNum,
    datePosted: req.body.datePosted,
    replies: req.body.replies || [],
  });
  try {
    const createdPost = await newPost.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Update an existing post by ID
app.put('/api/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const updatedPost = await Posts.findByIdAndUpdate(postId, req.body, { new: true });
    res.json({ message: 'Post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete a post by ID
app.delete('/api/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    await Posts.findByIdAndDelete(postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
