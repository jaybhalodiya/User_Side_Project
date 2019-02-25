const mongoose=require('mongoose');

const samp = mongoose.Schema({
    id:Number,
    Name:String,
    Price:Number,
    Date:Date
},{
    timespace:true,
});

module.exports=mongoose.model('Sample1',samp)