console.log("welcome to inotebook");
// ENTERNAL PACKAGES
const express = require("express");
require("dotenv").config({path: "./.env"});
const cors = require("cors");
//INTERNAL PACKAGES (modules)
const auth = require("./routes/auth");
const notes = require("./routes/notes");
const connectDB = require("./db_connect");
const errorHandler = require("./middleware/errorHandler")

// code start
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/notes", notes);
app.get("/onlyforcheck",(req, res)=>{
    res.status(200).json({status: true, msg : "yeah its working fine"});
})
app.use(errorHandler)
const start = async () => {
  // it will await until the db connected
  try {
   await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`magic notes app listening on port ${port}/`);
      // console.log("Magic notes app is listening on port " + port);
      
    });
  } catch (err) {
    console.log(err);
  }
};

start();
