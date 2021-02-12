const mongoose = require('mongoose')

const userSchema  = new mongoose.Schema({
    mobile:{
        type:String,
        unique:true,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required:false
    },
    about:{
        type:String,
        required:false,
    },
    otp:{
        type:Number,
        
        
    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)


