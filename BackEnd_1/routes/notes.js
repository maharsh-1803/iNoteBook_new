const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const {body , validationResult} = require('express-validator')

// Route : 1 - get all Notes  
router.get('/fetchAllNotes',fetchuser,async(req,res)=>
{
    const notes = await Notes.find({user:req.user.id});
    res.json(notes);
})

// Route :2 - add notes
router.post('/addNote',fetchuser,[
    body('title','Enter valid title').isLength({min:3}),
    body('description','Enter valid description').isLength({min:5}) 
],async(req,res)=>{
    try {
        const {title,description,tag} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()})
        }
    
        const note = new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
    
})

// Route : 3 - update Note (PUT request for update any data)
router.put('/updateNote/:id',fetchuser,async (req,res)=>{
    const {title , description , tag} = req.body;
    const newNote = {};
    if(title){
        newNote.title=title
    }
    if(description){
        newNote.description = description
    }
    if(tag){
        newNote.tag = tag
    }

    let note = await Notes.findById(req.params.id);
    if(!note)
    {
        return res.status(404).send("Not found");
    }

    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.send({note})
})

// Route : 4 - delete note 

router.delete('/deleteNote/:id',fetchuser,async(req,res)=>{
    let note = await Notes.findById(req.params.id);
    if(!note)
    {
        return res.status(404).send("Not Found")
    }

    if(note.user.toString()!==req.user.id)
    {
        return res.status(401).send("Not allowed")
    }

    note  = await Notes.findByIdAndDelete(req.params.id);
    res.json({"success":"Note has been deleted",note:note});
})
module.exports = router ;