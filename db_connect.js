const mongoose = require('mongoose');
mongoose.set("strictQuery", false);





// connect to mongo DB
const connectDB = (url)=>{
  return mongoose.connect(url);
}


module.exports = connectDB;

