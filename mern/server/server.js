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
              
              //AUTH/ REGISTER//

// API endpoint for user authentication
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email:email, password:password });
    if (user) {
      //const token = jwt.sign({ userId: user._id }, SECRET_KEY);
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

       // CLASS / SECTION //

// API Endpoint for fetching all of a user's class/section pairs
app.get(`/discussion/courses`, async (req, res) => {
  const id = req.query.id;
  try {
  const user = await Users.findById(id);
  const enrolledIn = user.enrolledIn;
  res.json(enrolledIn);
  } catch(error){
    res.status(500).json({ message: 'Error fetching discussions' });
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
    res.json({course: course , section: section});
  } catch (error) {
    console.log("Class Not Added")
    res.status(500).json({ message: 'Error adding class' });
  }
});

    //POSTS//

    // Get all posts by course/section pair
app.get('/api/posts', async (req, res) => {
  const course=req.query.course;
  const section=req.query.section;
  try {
    const posts = await Posts.find({ 'belongsToDiscission.course' :course, 'belongsToDiscission.section' : section});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});
  
// Get all posts by userId
app.get('/api/user/posts', async (req, res) => {
  const userId=req.query.id;
  try {
    const user = await Users.findById(userId);
    const postIds = user.postIDs;
    const posts = await Posts.find({ _id : {$in : postIds}});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Get post by postId
app.get('/api/post', async (req, res) => {
  const postId=req.query.id;
  try {
    const post = await Posts.findById(postId);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Create a new post
app.post('/api/discussion/post', async (req, res) => {
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

    let dt = getDateAndTime();

    var newPost = new Posts({
      threadTitle: req.body.title,
      text: req.body.text,
      belongsToDiscission: belongsTo,
      timePosted: dt.time,
      datePosted: dt.date,
      replies: req.body.replies || [],
    });

    const createdPost = await newPost.save();

    // Update the user's posts array with the new post's ID
    user.postIDs.push(createdPost._id);
    await user.save();

    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

function getDateAndTime(){
  let date_time = new Date();
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let day = ("0" + date_time.getDate()).slice(-2);
  let year = date_time.getFullYear();
  let minutes = ("0" + (date_time.getMinutes() + 1)).slice(-2);
  let hour = date_time.getHours();
  let ap = 'AM'
  if (hour   > 11) { ap = "PM";             }
  if (hour   > 12) { hour = hour - 12;      }
  if (hour   == 0) { hour = 12;             }
  if (hour   < 10) { hour   = "0" + hour;   }

  let time = hour + ":" + minutes + " " + ap; 
  let date = month + "/" + day + "/" + year;
  return {time,date};
}



// Update an existing post by ID
app.put('/api/posts/', async (req, res) => {
  const postId = req.query.id;
  const userId = req.query.userId;

  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    let dt = getDateAndTime();
    console.log("New Date/Time");

    const updatedPost = await Posts.findByIdAndUpdate(postId, {$set: {'text': req.body.text, 'timePosted': dt.time, 'datePosted': dt.date}} , { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
    console.log(error);
  }
});

// Delete a post by ID
app.delete('/api/posts', async (req, res) => {
  const postId = req.query.id;
  const userId = req.query.userId;

  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const user = await Users.findById(userId);
    await Posts.findByIdAndDelete(postId);
    user.postIds = user.postIDs.filter(id => id.toString() !== postId);
    await user.save();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

 // Get user name by postid
 app.get('/api/user/', async (req, res) => {
  const postId=req.query.id;
  try {
    const user = await Users.find({postIDs: postId}, {firstName : 1 , lastName: 1});
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user by postID' });
  }
});


// REPLIES
// Create a new reply for a post
app.post('/api/posts/reply', async (req, res) => {
  const postId = req.query.postId;
  const userId = req.query.userId;
  console.log("In add a reply api");
  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    post.replies.push({replyText: req.body.text , firstName: user.firstName, lastName : user.lastName, user: userId});
    await post.save();

    res.status(201).json({replyText: req.body.text , firstName: user.firstName, lastName : user.lastName, userId: userId});
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error adding reply' });
  }
});

// Get replies for a given post along with user names
app.get('/api/posts/:postId/replies', async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Posts.findById(postId).populate('replies.userId', 'firstName lastName');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const replies = post.replies;
    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching replies' });
    console.log(error);
  }
});

// Update an existing reply by ID
app.put('/api/posts/replies', async (req, res) => {
  const postId = req.query.id;

  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const updatedPost = await Posts.findByIdAndUpdate(postId, {$set: {'replyText': req.body.text }}, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post reply' });
    console.log(error);
  }
});

// Delete a reply by reply ID
app.delete('/api/posts/replies', async (req, res) => {
  const replyId = req.query.id;
  const postId = req.query.postId;

  try {
    const reply = await Posts.update({_id : postId},  ... {$pull : { "replies" : {"_id":replyId} } } )
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 } );
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    await post.save();

    res.json({ message: 'Reply deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reply' });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
