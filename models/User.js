const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    require: [true, "Value must be required"],
    trim : true
  },
  email: {
    type: String,
    require: [true, "Value must be required"],
    unique: true,
    min: [7 , "Length must be atleast 6 character"]

  },
  password: {
    type: String,
    require: [true, "Value must be required"],

  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
