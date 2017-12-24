var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('./db/connector');
var user = require('./model/user');
var app = express();
var port = 3000;

app.use(bodyparser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/api/add',(req, res)=>{
    var usuario = new user({
        name: req.body.name,
        zodiac : req.body.zodia
    });

    usuario.save().then((doc)=>{
        res.send(doc)    
    },(err)=>{
        res.status(400).send(err.message);
    });
})

app.listen(port, ()=>{
    console.log('Se conecta al puerto ' + port)
})