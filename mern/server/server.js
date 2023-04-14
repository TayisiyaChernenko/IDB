const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;
const Db = process.env.ATLAS_URI;
const mongoose = require('mongoose');
const Posts = require('./models/postModel');
const Users = require('./models/userModel');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(Db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

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

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

app.post('/discussions', async (req, res) => {
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
    res.status(500).json({ message: 'Error creating discussion' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    await Posts.findByIdAndDelete(postId);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

/*
// Other API endpoints and functions are commented out here
// API endpoint for deleting a specific post
app.delete('/api/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    await postsCollection.deleteOne({ _id: ObjectId(postId) });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});
// API endpoint for fetching all discussions
app.get('/discussions', async (req, res) => {
  try {
    const discussions = await postsCollection.find({}).toArray();
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discussions' });
  }
});
// API endpoint for fetching a specific discussion
app.get('/discussions/:id', async (req, res) => {
  const discussionId = req.params.id;
  try {
    const discussion = await postsCollection.findOne({ _id: ObjectId(discussionId) });
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discussion' });
  }
});
// API endpoint for creating a new discussion
app.post('/discussions', async (req, res) => {
  const discussion = req.body;
  try {
    const result = await postsCollection.insertOne(discussion);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating discussion' });
  }
});
// API endpoint for adding a comment to a specific discussion
app.post('/discussions/:id/comments', async (req, res) => {
  const discussionId = req.params.id;
  const comment = req.body;
  try {await postsCollection.updateOne(
      { _id: ObjectId(discussionId) },
      { $push: { comments: comment } }
    );
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
});
// API endpoint for deleting a specific discussion
app.delete('/discussions/:id', async (req, res) => {
  const discussionId = req.params.id;
  try {
    await postsCollection.deleteOne({ _id: ObjectId(discussionId) });
    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting discussion' });
  }
});
// API endpoint for updating a specific discussion
app.put('/discussions/:id', async (req, res) => {
  const discussionId = req.params.id;
  const updatedDiscussion = req.body;
  try {
    await postsCollection.updateOne(
      { _id: ObjectId(discussionId) },
      { $set: updatedDiscussion }
    );
    res.json({ message: 'Discussion updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating discussion' });
  }
});
// API endpoint for admin to delete a specific discussion
app.delete('/admin/discussions/:id', async (req, res) => {
  const discussionId = req.params.id;
  if (isAdmin(req)) {
    try {
      await postsCollection.deleteOne({ _id: ObjectId(discussionId) });
      res.json({ message: 'Discussion deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting discussion' });
    }
  } else {
    res.status(403).json({ message: 'Not authorized' });
  }
});
// Function to check if a user is an admin
async function isAdmin(request) {
  const token = request.headers.authorization;
  
  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await usersCollection.findOne({ _id: ObjectId(decoded.userId) });
    return user && user.role === 'admin';
  } catch (error) {
    return false;
  }
}
*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
