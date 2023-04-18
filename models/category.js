const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    isDeleted:{type:Boolean,default:false},
    deletedAt:{type:Date}
},{timestamps:true});
module.exports = mongoose.model("Category", categorySchema);