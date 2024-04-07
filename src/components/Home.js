import React, { useContext } from 'react'
import noteContext from '../context/notes/notecontext';
import Notes from './Notes';
import AddNote from './AddNote';
const Home = () => {
    const context = useContext(noteContext);
    const {notes,setnotes}= context;
    return (
        <div>
            
            <Notes/>
        </div>
    )
}

export default Home