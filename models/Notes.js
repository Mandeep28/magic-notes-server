const mongoose = require("mongoose");
const { Schema } = mongoose;
// make a schema called notes
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: [true, "Value Must be required"],
    minLength: [5, "Length must be 6 character"],
    maxLength : [250, "Length should not be graeter than 250"]
  },
  description: {
    type: String,
    required: [true, "Value Must be required"],
    minLength: [5, "Length must be 6 character"],
    maxLength : [2000, "Length should not be graeter than 2000"]
  },
  tag: {
    type: String,
    default: "general",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NotesSchema);
