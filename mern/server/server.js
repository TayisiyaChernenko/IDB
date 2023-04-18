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
mongoose.connect(Db);
// Secret key for JWT
const SECRET_KEY = 'mysecretkey';

// API endpoint for user authentication
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email:email, password:password });
    if (user) {
      //const token = jwt.sign({ userId: user._id }, SECRET_KEY);
      console.log(user._id);
      res.json(user._id);
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during authentication' });
  }
});

// Register a new user
app.post('/discussions/register', async (req, res) => {
  var newUser = new Users({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    postId: [],
    enrolledIn: [],
  });
  try {
    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: 'Error during registration' });
  }
});


// API Endpoint for fetching all of a user's class/section pairs
app.get(`/discussion/courses/:id`, async (req, res) => {
  const id = req.params.id;
  try {
  const user = await Users.findById(id);
  console.log(user);
  const enrolledIn = user.enrolledIn;
  console.log(enrolledIn);
  res.json(enrolledIn);
  } catch(error){
    res.status(500).json({ message: 'Error fetching discussions' });
  }
});


//Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find({});
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
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

// Add a course/section pair to a User's course list
app.post('/api/courses', async (req, res) => {
  const userId = req.body.userId;
  try {
    // Get the user by ID
    const user = await Users.findById(userId);
    if (!user) {
      console.log("no user")
      return res.status(404).json({ message: 'User not found' });
    }
    const course = req.body.course;
    const section = req.body.section;
    // Update the user's enrolledIn array with the new course/section
    user.enrolledIn.push({course: course , section: section});
    await user.save();
  } catch (error) {
    console.log("Class Not Added")
    res.status(500).json({ message: 'Error adding class' });
  }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
  const userId = req.body.userId;

  try {
    // Get the user by ID
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const belongsTo = {
      course: req.body.courseName,
      section: req.body.sectionNum,
    }

    // Create the new post
    var newPost = new Posts({
      text: req.body.text,
      belongsToDiscission: belongsTo,
      //datePosted: req.body.datePosted,
      replies: req.body.replies || [],
    });

    const createdPost = await newPost.save();

    // Update the user's posts array with the new post's ID
    user.postIds.push(createdPost._id);
    await user.save();

    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Update an existing post by ID
app.put('/api/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;

  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const user = await Users.findById(userId);
    if (!user || !user.postIds.includes(postId)) {
      return res.status(403).json({ message: 'You are not allowed to update this post' });
    }

    const updatedPost = await Posts.findByIdAndUpdate(postId, req.body, { new: true });
    res.json({ message: 'Post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete a post by ID
app.delete('/api/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;

  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const user = await Users.findById(userId);
    if (!user || !user.postIds.includes(postId)) {
      return res.status(403).json({ message: 'You are not allowed to delete this post' });
    }

    await Posts.findByIdAndDelete(postId);
    user.postIds = user.postIds.filter(id => id.toString() !== postId);
    await user.save();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
