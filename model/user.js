var mongoose = require('mongoose');
var Schema = mongoose.Schema;


User = new Schema({
    name: String,
    lastname: String,
    age: Number,
    zodiac: String,
    sons: [{name:String, age: Number}]
});

module.exports = mongoose.model('user',User,'users');