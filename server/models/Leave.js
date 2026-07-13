const mongoose=require("mongoose");


const LeaveSchema=new mongoose.Schema({

employee:String,

department:String,

type:String,

from:String,

to:String,

days:Number,

reason:String,

status:{
type:String,
default:"Pending"
}

});


module.exports=
mongoose.model(
"Leave",
LeaveSchema
);