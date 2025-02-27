const jwt = require('jsonwebtoken');
const jwt_sec = "hiiMyNameIsMaharsh#@#Don'tTellanyOneElse";

const fetchuser = (req,res,next)=>
{
    // Get the user from the jwt token and add id to req object 
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,jwt_sec);
        req.user = data.user;
        next();    
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    
}
module.exports = fetchuser;