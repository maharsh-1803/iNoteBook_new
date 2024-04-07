const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');
const jwt_sec = "hiiMyNameIsMaharsh#@#Don'tTellanyOneElse";

// route-1 : this is use for create user
router.post('/createUser',[
    body('name','Enter valid name').isLength({min:3}),
    body('email','Enter valid Email').isEmail(),
    body('password','enter valid Password').isLength({min:5})
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
    try{
    let user = await User.findOne({email:req.body.email}) 
    if(user)
    {
        return res.status(400).json({"message":"user already exists"})
    }
    const salt =await bcrypt.genSalt(10);
    const securedPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:securedPass
    })
    // .then(user=> res.json(user))
    // .catch(err=>{console.log(err);
    // res.json({error:"please enter a unique value"})}); 
    // res.send(req.body);
    const data = {
        user:
        {
            id:user.id
        }
    }
    const authToken = jwt.sign(data,jwt_sec)
    res.json({authToken})
    }
    catch(error)
    {
        console.log(error.message)
        res.status(500).json("some Error occured")  
    }
})
 
// route-2 : this is use for authenticate user 
router.post('/login',[
    body('email','enter valid email').isEmail(),
    body('password','password can not be blank').exists()
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password} = req.body;
    try{
        let user =await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({error:"please login with valid credentials"})
        }
        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword)
        {
            return res.status(400).json({errors:"please login with valid credentails"})
        }
        const payload = {
            user:{
                id:user.id
            },
        }
        const authToken = jwt.sign(payload,jwt_sec);

        res.json(authToken)
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }

});

// route -3 : get loggedin user details 
router.post('/getuser',fetchuser,async(req,res)=>{
try {
    const userId = req.user.id;
   const user = await User.findById(userId).select("-password");
   res.send(user); 
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error");
}
})
module.exports = router;