// external packages
const express = require("express");
const { body, validationResult } = require("express-validator");

// intenal packages
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUserDetail");
const { customErrorHander } = require("../errors/customError");

// code start
const router = express.Router();

// ROUTER 1 :- fetch all notes of particular user using "get" and endpoint is "/ap1/v1/auth/fetchnotes" and login required
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.status(201).json({ status: true, notes });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: false, msg: "internal server error" });
  }
});

// ROUTER 2 :- All notes to particular user using "post" and endpoint is "/ap1/v1/auth/addnote" and login required
router.post(
  "/addnote",
  fetchUser,
  [
    body(
      "title",
      "length of title should atleast more than 3 characters."
    ).isLength({
      min: 3,
    }),
    body(
      "description",
      "length of description should atleast more than 5 characters."
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // check if error or not
      const errors = validationResult(req);
      // if error found the return the error's array
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const notes = await Notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      });
      res.status(201).json({ status: true, notes });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: false, msg: "internal server error" });
    }
  }
);

// ROUTER 3 :- update an existing note of a particular user using "put" and endpoint is "/ap1/v1/auth/updatenote" and login required
router.put("/updatenote:id", fetchUser, async (req, res) => {
  try {
    // check if note id is valid or not
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      return next(customErrorHander("Note not found", 404))
    }
    // check if correct user is update the note or not
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).json({ status: false, msg: "unauthorized" });
    }
    // finally update the note
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    notes = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { edit: true }
    );
    res.status(201).json({ status: true, notes });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: false, msg: "internal server error" });
  }
});
// ROUTER 4 :- delete an existing note of a  particular user using "put" and endpoint is "/ap1/v1/auth/deletenote" and login required
router.delete("/deletenote:id", fetchUser, async (req, res) => {
  try {
    // check if note id is valid or not
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      return next(customErrorHander("Note not found", 404))
    }
    // check if correct user is update the note or not
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).json({ status: false, msg: "unauthorized user" });
    }
    // finally delete the note

    notes = await Notes.findByIdAndDelete(req.params.id);
    res.status(201).json({ status: true, msg: "note successfully deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: false, msg: "internal server error" });
  }
});
module.exports = router;
