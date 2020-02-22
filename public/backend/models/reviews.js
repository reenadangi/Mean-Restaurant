var mongoose = require('mongoose');
const ReviewSchema=new mongoose.Schema({
    name:{type: String},
    rating:{type:Number},
    review:{type:String},
    restaurant:{type:mongoose.Schema.Types.ObjectId,ref:"Restaurant",required:true}

})
mongoose.model('Reviews', ReviewSchema); 