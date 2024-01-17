

const mongoose=require("mongoose");



const connectDB = async ()=>{
    try { 
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected")}
    catch(err){
        console.log("Error", err)
    }


}

module.exports= connectDB

