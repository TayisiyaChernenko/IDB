var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const discussionSchema = new Schema({
  course : String,
  section : String,
  });

const UsersSchema = new Schema({
  email : String,
  firstName : String,
  lastName : String,
  password : String,
  postIDs: [ObjectId],
  enrolledIn : [discussionSchema],
});



const UsersModel = mongoose.model('Users', UsersSchema);
module.exports = UsersModel;