const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const chatSchema  = new mongoose.Schema({
    sender:{
        type:ObjectId,
        ref :"User"
    },
    reciever:{
        type:ObjectId,
        ref:"user"
    },
    media:{
        type:String,
        required:false
    },
    seen:{
        type:Boolean,
        default:false
    }
},{timestamps:true}
)

module.exports = mongoose.model("Chat",chatSchema)