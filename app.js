
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('./db/connector');
var user = require('./model/user');
var { ObjectID } = require('mongodb');
var aut = require('./middleware/autenticate').authenticate;


var app = express();
var port = 3000;

app.use(bodyparser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/api/add',(req, res)=>{
    var usuario = new user({
        name: req.body.name,
        zodiac : req.body.zodiac,
        email: req.body.email,
        password: req.body.password
    });    
    usuario.save().then(()=>{
        return usuario.generateAuthToken();
    })
    .then((token)=>{
        res.header('x-auth',token).send(usuario);        
    })
    .catch((err)=>{
        console.log(err);
        res.sendStatus(400);        
    })
});

app.get('/api/users',(req, res)=>{
    user.find().then((data)=>{
        res.send(data);
    });
});



app.get('/api/users/me',aut, (req,res)=>{
    res.send(req.user);
})

app.get('/api/users/:id',(req, res)=>{
    
    if(!ObjectID.isValid(req.params.id)){
        
        return res.sendStatus(404);
    }
    
    user.findById(req.params.id).then((user)=>{
        if(!user){ res.send('id not found')}
        res.sendStatus(404);
    }).catch((e)=>{res.sendStatus(500);});
});

app.delete('/api/users/del/:id',(req, res)=>{
    console.log(req.params);
    if(!ObjectID.isValid(req.params.id)){
        
        return res.sendStatus(404);
    }

    user.findByIdAndRemove(req.params.id).then((data)=>{
        res.send(data);
    });
});

app.patch('/api/users/upd/:id',(req, res)=>{
    if(!ObjectID.isValid(req.params.id)){
        
        return res.sendStatus(404);
    }

    user.findOneAndUpdate(
        {_id: req.params.id},
        {$set: {name: "prueba de update"}},)
})


app.listen(port, ()=>{
    console.log('Se conecta al puerto ' + port)
})


module.exports = {app};