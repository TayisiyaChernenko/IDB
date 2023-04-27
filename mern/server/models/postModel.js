var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const discussionSchema = new Schema({
  course : String,
  section : String,
  }); 
  
const PostsSchema = new Schema({
  threadTitle: String,
  text: String,
  belongsToDiscission : discussionSchema,
  timePosted: String,
  datePosted: String,
  replyingTo: [ObjectId],
});



const PostsModel = mongoose.model('Posts', PostsSchema);
module.exports = PostsModel;
