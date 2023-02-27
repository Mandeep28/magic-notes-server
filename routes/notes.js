// external packages
const express = require("express");

// intenal packages

const fetchUser = require("../middleware/fetchUserDetail");

const {getAllNotes, createNote, updateNote, deleteNote, getSingleNote} = require("../controller/notes");

// code start
const router = express.Router();

router.route("/notes").get(fetchUser, getAllNotes).post(fetchUser,createNote);

router.route("/note/:id").get(fetchUser,getSingleNote).put(fetchUser,updateNote).delete(fetchUser,deleteNote)





module.exports = router;
