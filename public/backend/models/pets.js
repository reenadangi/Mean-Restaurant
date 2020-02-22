const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const PetSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name Required"], minlength: [3, "Pet's Name must have at least 3 characters."], unique: true},
    type: {type: String, required: [true, "Type Required"], minlength: [3, "The minimum length for a Pet type is 3"]},
    description: {type: String, required: [true, "Description Required"], minlength:[3, "The minimum length for a Pet description is 3"]},
    skill1: {type: String},
    skill2: {type: String},
    skill3: {type: String},
    likes: {type: Number, default: 0}
    }, {timestamps: true, strict: false});

PetSchema.plugin(uniqueValidator , {message: 'Pet name should be unique'});

// add plugin for email validation

mongoose.model('Pets', PetSchema); 