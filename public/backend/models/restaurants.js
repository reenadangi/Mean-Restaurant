const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const RestaurantSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name Required"], unique: true},
    cuisine: {type: String, required: [true, "Type Required"]},
    about:String,
    imagePath:String,
    place_id:String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Users",required:true},
    latitude:Number,
    longitude:Number,
    }, {timestamps: true, strict: false});

    RestaurantSchema.plugin(uniqueValidator , {message: 'Restaurant name should be unique'});

// add plugin for email validation

mongoose.model('Restaurant', RestaurantSchema); 