const Notes = require("../models/Notes");
const asyncWrapper = require("../middleware/async");
const { customErrorHander } = require("../errors/customError");


// Get all notes of specific user
const getAllNotes = asyncWrapper( async (req, res,next) => {

    const userId = req.user.id;
      const notes = await Notes.find({ user: userId});
      res.status(201).json({ status: true, length: notes.length, notes });

  })

// get single note
const getSingleNote = asyncWrapper (async (req,res,next) =>{
    const noteId = req.params.id;
    const findNote = await Notes.findOne({_id: noteId});
    if(!findNote) {
        return next(customErrorHander(`Note not found with id:${noteId}`, 404));
    }
    if (findNote.user.toString() !== req.user.id) {
        return next(customErrorHander("Unauthorized", 401))
    }

    res.status(200).json({status: true, findNote})
})




//   createNote
const createNote =  asyncWrapper( async (req, res,next) => {


      const { title, description, tag } = req.body;
      const note = await Notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      });
      res.status(201).json({ status: true, msg: "note added successfully" ,note});

  })


//   update note 
const updateNote = asyncWrapper(async (req, res,next) => {
    const noteId = req.params.id;
    const findNote = await Notes.findOne({_id :noteId });
    if(!findNote) {
        next(customErrorHander(`note not found with id : ${noteId}`, 404));
    }
    if (findNote.user.toString() !== req.user.id) {
        return next(customErrorHander("Unauthorized", 401))
    }
    console.log(req.body);
    
      const note = await Notes.findOneAndUpdate({_id: noteId}, req.body,{new: true, runValidators: true})
      console.log(note);
      
      res.status(201).json({ status: true, msg: "note update successfully", note  });
  
    })
// delete note
const deleteNote =  async(req, res,next) => {
  
    const noteId = req.params.id;
    const userId = req.user.id;
    const findNote = await Notes.findOne({_id :noteId });
    if(!findNote) {
        next(customErrorHander(`note not found with id : ${noteId}`, 404));
    }
    if (findNote.user.toString() !== userId) {
        return next(customErrorHander("Unauthorized", 401))
    }
      // finally delete the note
  
      const note = await Notes.findByIdAndDelete(req.params.id);
      res.status(201).json({ status: true, msg: "note successfully deleted" , note});
 
    }


module.exports = {getAllNotes, createNote, updateNote, deleteNote, getSingleNote}