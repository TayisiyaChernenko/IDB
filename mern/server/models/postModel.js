var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostsSchema = new Schema({
  text: String,
  courseName: String,
  sectionNum: String,
  datePosted: Date,
  replies:  [ObjectId] //postIDs
});

const PostsModel = mongoose.model('Posts', PostsSchema);
module.exports = PostsModel;
