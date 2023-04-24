var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const discussionSchema = new Schema({
  course : String,
  section : String,
  datePosted: Date,
  }); 


  const replySchema = new Schema({
    replyText : String,
    firstName : String,
    lastName: String,
    userId : ObjectId,
    }); 
  
  
const PostsSchema = new Schema({
  text: String,
  belongsToDiscission : discussionSchema,
  timePosted: String,
  datePosted: String,
  replies:  [replySchema] //postIDs
});



const PostsModel = mongoose.model('Posts', PostsSchema);
module.exports = PostsModel;
