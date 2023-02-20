const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGO_ATLAS_URI;
// "mongodb+srv://mandeepSingh:helloSunny88@cluster0.prrizft.mongodb.net/inotebook?retryWrites=true&w=majority";

// connect to mongo DB
const connectToMongo = () => {
  mongoose.connect(process.env.MONGO_ATLAS_URI);
  console.log("connect to db");
};

module.exports = connectToMongo;
