const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Value must be required"],
    trim : true,
    minLength: [3, "Length must be 3 char"],
    maxLength: [15, "Length not be greater than 15 char"],
  },
  email: {
    type: String,
    required: [true, "Value must be required"],
    unique: true,
    minLength: [7 , "Length must be atleast 6 character"],
    maxLength: [30, "Length not be greater than 30 char"],


  },
  password: {
    type: String,
    required: [true, "Value must be required"],
    minLength : [8 , "Length must be 8 char"],
    maxLength: [16, "Length not be greater than 16 char"],

  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
