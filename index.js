console.log("welcome to inotebook");
// ENTERNAL PACKAGES
const express = require("express");
require("dotenv").config();
const cors = require("cors");
//INTERNAL PACKAGES (modules)
const auth = require("./routes/auth");
const notes = require("./routes/notes");
const connectToMongo = require("./db_connect");

// code start
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
// const url = "mongodb://http://localhost:27017/test";
// const url = process.env.MONGO_ATLAS_URI;
// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/notes", notes);
app.get("/onlyforcheck",(req, res)=>{
    res.status(200).json({status: true, msg : "yeah its working fine"});
})

const start = async () => {
  // it will await until the db connected
  try {
    await connectToMongo();

    app.listen(port, () => {
      // console.log(`magic notes app listening on port http://localhost:${port}/`);
      console.log("Magic notes app is listening on port " + port);
      
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
