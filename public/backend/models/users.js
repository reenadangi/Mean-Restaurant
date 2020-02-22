const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const UsersSchema=new mongoose.Schema({
    fname:{type:String, required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true,unique: true},
    password:{type:String,required:true},
});
// add plugin for email validation
UsersSchema.plugin(uniqueValidator)
mongoose.model('Users', UsersSchema); 