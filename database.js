var mongoose=require("mongoose")
var names=new mongoose.Schema({
    Name:{type:String},
    age:{type:String},
    phone_number:{type:String},
    likes:{type:String},
    birthday:{type:String},
    review:{type:String}
    })

module.exports=mongoose.model("Names", names)