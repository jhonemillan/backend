
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('./db/connector');
var user = require('./model/user');
var { ObjectID } = require('mongodb');
var app = express();
var port = 3000;

app.use(bodyparser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/api/add',(req, res)=>{
    var usuario = new user({
        name: req.body.name,
        zodiac : req.body.zodiac
    });

    usuario.save().then((doc)=>{
        res.send(doc)    
    },(err)=>{
        res.status(400).send(err.message);
    });
});

app.get('/api/users',(req, res)=>{
    user.find().then((data)=>{
        res.send(data);
    });

   
});

app.get('/api/users/:id',(req, res)=>{
    
    if(!ObjectID.isValid(req.params.id)){
        
        return res.sendStatus(404);
    }
    
    user.findById(req.params.id).then((user)=>{
        if(!user){ res.send('id not found')}
        res.send(user);
    }).catch((e)=>{res.sendStatus(500);});
})


app.listen(port, ()=>{
    console.log('Se conecta al puerto ' + port)
})


module.exports = {app};