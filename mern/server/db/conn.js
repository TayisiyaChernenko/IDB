const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let usersCollection, postsCollection; 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db('discussion_board');
        usersCollection = db.collection('users');
        postsCollection = db.collection('posts');
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};

