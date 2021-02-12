const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const groupSchema  = new mongoose.Schema({
    members:{
        type : [ObjectId],
        ref:"User"
    },
    admin:{
        ref:ObjectId,
        ref:"User"
    }
},{timestamps:true})


module.exports = mongoose.model("Group",groupSchema)





