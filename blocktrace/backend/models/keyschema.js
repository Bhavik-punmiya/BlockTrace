const mongoose = require("mongoose");

const keyschema = new mongoose.Schema({
    email: {
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
    
})
module.exports = mongoose.model("keys", keyschema);