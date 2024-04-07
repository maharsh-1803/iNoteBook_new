import react, { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)
  // add note
  const addNote = async(title, description, tag) => {
    
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NThiNzgyYmFmYmY2ZjE3ZjZhZWJmIn0sImlhdCI6MTcwNDMwMTI4NX0.PYiEvLkeHCVwlKZeTL3WjpKMFdTA9z3_D9sC_Ex3yiw"

      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    const note = {
      "_id": "6596e6db556e428a700fc1b3",
      "user": "65958b782bafbf6f17f6aebf",
      "title": JSON.title,
      "description": description,
      "tag": tag,
      "date": "2024-01-04T17:11:55.259Z",
      "__v": 0
    };
    setnotes(notes.concat(note))
  }
  //fetch all notes
  const fetchAllNote = async() => {
    
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NThiNzgyYmFmYmY2ZjE3ZjZhZWJmIn0sImlhdCI6MTcwNDMwMTI4NX0.PYiEvLkeHCVwlKZeTL3WjpKMFdTA9z3_D9sC_Ex3yiw"

      },
      
    });
    const json = await response.json()
    console.log(json)
    setnotes(json)
  }
  //delete note for iNoteBook
  const deleteNote = async(id) => {
    
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NThiNzgyYmFmYmY2ZjE3ZjZhZWJmIn0sImlhdCI6MTcwNDMwMTI4NX0.PYiEvLkeHCVwlKZeTL3WjpKMFdTA9z3_D9sC_Ex3yiw"

      }
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    console.log("Deleting the note with id:" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)
  }
  //Edit note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5NThiNzgyYmFmYmY2ZjE3ZjZhZWJmIn0sImlhdCI6MTcwNDMwMTI4NX0.PYiEvLkeHCVwlKZeTL3WjpKMFdTA9z3_D9sC_Ex3yiw"

      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote,fetchAllNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;