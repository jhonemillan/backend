var mongoose = require('mongoose');
var validator = require('validator');
var SHA256 = require("crypto-js/sha256");
var jwt = require('jsonwebtoken');
var _ = require('lodash');

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
        unique: true       
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

User.methods.generateAuthToken = function (){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    },'victoria').toString();

    user.tokens = user.tokens.concat([{access,token}]);

    return user.save()
    .then(()=>{
        return token;
    });
};

User.methods.toJSON = function (){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email'])
}

User.statics.findByToken = function (token){
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token,'victoria');
    } catch (error) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
    
}

module.exports = mongoose.model('user',User,'users');