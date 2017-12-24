var mongoose = require('mongoose');
var Schema = mongoose.Schema;


User = new Schema({
    name: {type: String, required: true},
    lastname: String,
    age: {type: Number, min: 12,max: 90},
    zodiac: {type: String, required: true, enum: ['aries', 'tauro', 'leo', 'virgo', 'Cancer']},
    sons: [{name:String, age: Number}]
});

module.exports = mongoose.model('user',User,'users');