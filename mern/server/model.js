const mongoose = require('mongoose');
const Db = process.env.ATLAS_URI;

await mongoose.connect(Db);


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Post = new Schema({
  postID: ObjectId,
  title: String,
  body: String,
  date: Date
});

const User = new Schema({

});