
const secretkey = require("../encryption/generateKey.js");
const { comparepassword, hashpassword }= require("../helpers/authhelper.js");
const keyschema = require("../models/keyschema.js");
const userschema = require("../models/userschema.js");
const JWT =  require("jsonwebtoken");
require('dotenv').config();


const registerController = async (req,res)=>{
   try{
       const {name,email,password,role} = req.body;
       if(!name){
        return res.send({ success:false,message:"name requires!!"})
       }
       if(!email){
        return  res.send({ success:false,message:"email requires!!"})
       }
       if(!password){
        return res.send({ success:false,message:"password requires!!"})
       }
       if(!role){
         return res.send({ success:false,message:"Role requires!!"})
       }
      
         const existinguser = await userschema.findOne({email});
         if(existinguser){
            return res.send({ success:false,message:"Already Existing User, Please Login "});
         }
        const hashedpassword = await hashpassword(password)
        const key = await secretkey();
         const user = new userschema({
            name,
            email,
            password:hashedpassword,
            role,
            key
         }).save();
         // const keys = new keyschema({
         //    email,
         //    role,
         //    key
         // }).save();

         res.status(201).send({
            success:true,
            message:"User successfully registered",
            user
         })
   }
   catch(error){
    console.log(error)
    res.status(500).send({
        success: false,
        message:"Error in registration",
        error
    })

   }
}

const loginController= async (req,res)=>{

   try{
      const {email,password}=req.body;
      if(!email || !password){
         return res.status(404).send(
            {
               success:false,
               message:"Invalid Email or Password"
            }
         )  
      }
      const user = await userschema.findOne({email});
      if(!user){
         return res.status(404).send({
            success:false,
            message:"Email is not registered"
         });
      }
      const match = await comparepassword(password,user.password)
      if(!match){
        return res.status(200).send({
            success:false,
            message:"Invalid password"
         })
      }
      const token = await JWT.sign({_id:user._id},process.env.JSW_SCERETKEY,{
         expiresIn:"7d"
       });
       res.status(200).send({
         success:true,
         message:"Logined Successfully",
         user:{
            name:user.name,
            email:user.email,
            role:user.role,
            id:user._id,
            key:user.key
         },
        
       })
       
   }
   catch(err){
      console.log(err)
      res.status(500).send({
        
         success:false,
         message:"ERROR IN LOGIN PAGE"
      });

   }

 }

 const generateproductController = async (req,res)=>{
   try{

        const key = await secretkey();
         const keys = await new keyschema({
            key
         }).save();
  console.log(keys);
         res.status(201).send({
            success:true,
            message:"Product Key Generated Successfully",
            keys:keys,
         })
   }
   catch(error){
    console.log(error)
    res.status(500).send({
        success: false,
        message:"Error in product Key generation",
        error
    })

   }
}






 const keyController= async (req,res)=>{

   try{
      
      const keys = await keyschema.find();
      
       res.status(200).send({
         success:true,
         message:"Keys fetched Successfully",
         keys
        
       })
       
   }
   catch(err){
      console.log(err)
      res.status(500).send({
        
         success:false,
         message:"ERROR IN keys fetching"
      });

   }

 }

const getkeybyemail = async (req,res)=>{
   try{
      const {email}=req.body;
   const user = await userschema.findOne({email});
   res.status(200).send({
      success:true,
      message:"Id fetched Successfully",
      user:{
         id:user._id,
      },
     
    })
  

}
catch(err){
   console.log(err)
   res.status(500).send({
     
      success:false,
      message:"ERROR IN keys fetching"
   });

}
}



 module.exports = {
   registerController,
   loginController,
   keyController,
   generateproductController,
   getkeybyemail

};