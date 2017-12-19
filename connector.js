const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/test',(err, db)=>{
    if(err){ return console.log('unable to connect to data base');}

    console.log('connected.');

    // db.db('test').collection('users').insertOne({
    //     nombre: 'jhon millan',
    //     email: 'jhon@gmail.com'
    // },(err, res)=>{
    //     if(err) {return console.log('unable to save data');}

    //     console.log(JSON.stringify(res.ops));
    // });

    db.db('test').collection('users').find({
        _id: new ObjectID("5a389a1b11bc7d3d89759aa6")
    }).toArray().then((rows)=>{
        console.log(rows);
    });

    db.db('test').collection('users').deleteOne({
        _id: new ObjectID("5a389a1b11bc7d3d89759aa6")
    }).then((res)=>{
        console.log(res);
    });

    db.close();
})