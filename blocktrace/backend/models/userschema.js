const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    role:{
        type:String,
    },
    key:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model("User", userschema);