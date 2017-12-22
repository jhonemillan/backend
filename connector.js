//import { MongoClient, ObjectID } from "mongodb";
var mongoose = require('mongoose');
var User = require("./model/user");


mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
mongoose.Promise = global.Promise;

var user = new User({
    name: 'Alejandro',
    lastname: 'Millan',
    age: 44,
    zodiac: 'Cancer',
    sons: [{name:'Victoria', age: 1.5},{name: 'Maya', age: 3}]  
});

user.save().then((user)=>{
    console.log('user saved' + user._id);
},(e)=>console.log(e.message));

// MongoClient.connect('mongodb://localhost:27017/test',(err, db)=>{
//     if(err){ return console.log('unable to connect to data base');}

//     console.log('connected.');

    // db.db('test').collection('users').insertOne({
    //     nombre: 'jhon millan',
    //     email: 'jhon@gmail.com'
    // },(err, res)=>{
    //     if(err) {return console.log('unable to save data');}

    //     console.log(JSON.stringify(res.ops));
    // });

//     db.db('test').collection('users').find({
//         _id: new ObjectID("5a389a1b11bc7d3d89759aa6")
//     }).toArray().then((rows)=>{
//         console.log(rows);
//     });

//     db.db('test').collection('users').deleteOne({
//         _id: new ObjectID("5a389a1b11bc7d3d89759aa6")
//     }).then((res)=>{
//         console.log(res);
//     });

//     db.close();
// })