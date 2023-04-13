const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var app = require('../server');
// This will help us connect to the database
const dbo = require("../db/conn");
 
// Secret key for JWT
const SECRET_KEY = 'mysecretkey';

// API endpoint for user authentication
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await usersCollection.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ userId: user._id }, SECRET_KEY);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during authentication' });
  }
});

// API endpoint for fetching all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await postsCollection.find({}).toArray();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

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
