const mongoose = require('mongoose');
const Db = process.env.ATLAS_URI;

await mongoose.connect(Db);
