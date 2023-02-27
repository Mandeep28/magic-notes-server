console.log("welcome to inotebook");
// ENTERNAL PACKAGES
const express = require("express");
//INTERNAL PACKAGES (modules)
const auth = require("./routes/auth");
const notes = require("./routes/notes");
const connectDB = require("./db_connect");
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors");
const { customErrorHander } = require("./errors/customError");
require('express-async-errors');
require("dotenv").config({path: "./.env"});

// code start
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
// const url = process.env.MONGO_URI;
const url = "mongodb://127.0.0.1:27017/magicNotes";

// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/notes", notes);
app.get("/onlyforcheck",(req, res)=>{
    res.status(200).json({status: true, msg : "yeah its working fine"});
})
app.use(errorHandler)




const start = async () => {
  try { 
   await connectDB(url);
    app.listen(port, () => {
      console.log(`Connect To Db + magic notes app listening on port http://localhost:${port}/`);;
      
    });
  } catch (err) {
    console.log(err);
  }
};

start();
