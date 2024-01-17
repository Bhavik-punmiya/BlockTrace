const JWT = require("jsonwebtoken");
const userschema=require("../models/userschema.js");
require('dotenv').config();

 const requireSignIn=async(req,res,next)=>{
    
    try{
    const decode = JWT.verify(req.headers.authorization,process.env.JSW_SCERETKEY)
    req.user =decode;
    next();
    }
    catch(err){
        console.log(err);
    }
}
 const isAdmin= async (req,res,next)=>{
    try{
    const user = await userschema.findById(req.user._id);
    if(user.role != 1){
        return res.status(401).send({
            success:false,
            message:"Unauthorized Access"
        })

    }
    else{
        next();
    }
    }
catch(err){
    console.log(err)

}

}

 const testController = (req,res)=>{
    try{
            res.send("Protected Routes")
    }
    catch(err){
        console.log(err);
        res.send({err});

    }

}
module.exports = {
    requireSignIn,
    isAdmin,
    testController
}