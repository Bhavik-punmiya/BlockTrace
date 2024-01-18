const mongoose = require("mongoose");

const keyschema = new mongoose.Schema({
    key:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    
})
module.exports = mongoose.model("keys", keyschema);