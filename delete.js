const mongoose = require("mongoose");
const url="mongodb+srv://dbuserMS:hellosunny28@cluster0.jbltg2z.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

mongoose.connect(url).then(()=>{console.log("connect to db")}).catch((err)=>{console.log(err.message)});