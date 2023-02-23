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
    require: [true, "Value Must be required"],
    min: [5, "Length must be 6 character"],
    max : [250, "Length should not be graeter than 250"]
  },
  description: {
    type: String,
    require: [true, "Value Must be required"],
    min: [5, "Length must be 6 character"],
    max : [2000, "Length should not be graeter than 2000"]
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
