var mongoose = require('mongoose');
var SHA256 = require("crypto-js/sha256");
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
const validator = require('node-mongoose-validator');

var Schema = mongoose.Schema;


User = new Schema({  
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        unique: true,
        index: true
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
User.path('email').validate(validator.isEmail(), 'Please provide a valid email address');

User.pre('save',function(next){
    var user = this;
    if(!user.isModified('password')){
        return next();
    }

    // hash the password along with our new salt
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash; 
            next();
        });
    });
})

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
    debugger;
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
    });
}

User.statics.findByCredentials = function(email, pwd){
    debugger;
    let User = this;    
    return User.findOne({email}).then((user)=>{         
        if(!user){            
            return Promise.reject(new Error('Usuario no existe'));
        }

        return new Promise((resolve, reject)=>{
            bcrypt.compare(pwd, user.password).then((res)=>{
                if(res){
                    resolve(user);
                }else{                
                    reject(new Error('incorrect password'));
                }
            }).catch((e)=>{
                console.log(e);
            });
        });
    });
}

module.exports = mongoose.model('user',User,'users');