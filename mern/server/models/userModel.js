var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsersSchema = new Schema({
  email : String,
  firstName : String,
  lastName : String,
  password : String,
  postIDs: [ObjectId]

});

const UsersModel = mongoose.model('Users', UsersSchema);
module.exports = UsersModel;