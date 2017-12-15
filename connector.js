const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test',(err, db)=>{
    if(err){ return console.log('unable to connect to data base');}

    console.log('connected.');

    db.db('test').collection('users').insertOne({
        nombre: 'jhon edwin millan',
        email: 'jhonemillan@gmail.com'
    },(err, res)=>{
        if(err) {return console.log('unable to save data');}

        console.log('user saved.');
    });

    db.close();
})