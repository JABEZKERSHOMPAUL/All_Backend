const { default: mongoose } = require("mongoose");

const listSchema=mongoose.Schema({
    todo:{type:String,require:true},
    isCompleted:{type:Boolean,default:false},
    createdBy:{type:mongoose.Schema.Types.ObjectId}

})

const Todo=mongoose.model("TO-DO",listSchema)
module.exports=Todo;