const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const url = "mongodb+srv://mandeep28:myDATAisMINE28@cluster0.prrizft.mongodb.net/inotebook?retryWrites=true&w=majority";
// const url = "mongodb://127.0.0.1:27017/test";


// mongoose.connect(url, ()=>{
//   console.log("Connect ToDB.....");
  
// });


// connect to mongo DB
const connectDB = (url)=>{
  return mongoose.connect(url);
}


module.exports = connectDB;

