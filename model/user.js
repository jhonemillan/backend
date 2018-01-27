var mongoose = require('mongoose');
var validator = require('validator');
var SHA256 = require("crypto-js/sha256");
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;


User = new Schema({
    name: {type: String, required: true},
    lastname: String,
    age: {type: Number, min: 12,max: 90},
    zodiac: {type: String, required: true, enum: ['aries', 'tauro', 'leo', 'virgo', 'Cancer']},
    sons: [{name:String, age: Number}],
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: 'is not valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },

    tokens: [{
        access:{type: String, required: true},
        token: {type: String, required: true}
    }]

});

module.exports = mongoose.model('user',User,'users');