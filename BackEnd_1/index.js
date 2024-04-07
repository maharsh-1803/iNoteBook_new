const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/glsnode",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database is connected")
}).catch((err)=>{
    console.log(err)
})
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes.js'))
//create server....
const PORT = 5000 // environment 
app.get('/',(req,res)=>
{
    res.send("hello Maharsh")
})
app.listen(PORT,()=>{
    console.log("Server is running on port ",PORT)
})