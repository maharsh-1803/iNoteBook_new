import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/notecontext'

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title:"",description:"",tag:"default"})
    const handelClick = (e)=>
    {
        e.preventDefault();
        addNote(note.title,note.description,note.tag) 
    }
    const onchange = (e)=>
    {
        setnote({[e.target.name]:e.target.value})
    }
  return (
    <div className='container my-3'>
                <h1>Add a Note</h1>
                <form>
                    <div class="mb-3">
                        <label htmlFor="title" class="form-label">title</label>
                        <input type="text" class="form-control" id="title" name='title' onChange={onchange}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="description" class="form-label">Description</label>
                        <input type="text" class="form-control" id="description" name='description' onChange={onchange}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="tag" class="form-label">Tag</label>
                        <input type="text" class="form-control" id="tag" name='tag' onChange={onchange}/>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={handelClick}>Add Note</button>
                </form>
            </div>
  )
}

export default AddNote