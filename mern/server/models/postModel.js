var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const discussionSchema = new Schema({
  course : String,
  section : String,
  }); 
  
const PostsSchema = new Schema({
  text: String,
  belongsToDiscission : discussionSchema,
  //datePosted: Date,
  replies:  [ObjectId] //postIDs
});



const PostsModel = mongoose.model('Posts', PostsSchema);
module.exports = PostsModel;
