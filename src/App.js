import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
    <Navbar/>
    <Alert message="This is note taking web app"/>
    <Routes>
    <Route exact path="/" element={<Home/>}></Route>
    <Route exact path="/About" element={<About/>}></Route>
    </Routes>
    </NoteState>
    </>
  );
}

export default App;
