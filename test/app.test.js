const expect = require('chai');
const {app} = require('../app');
const {User} = require('../model/user');
const request = require('supertest'); 

describe('api/add', function() {
    describe('#save()', function() {
      it('should save without error', function(done) {
        var usuario = {
            email: 'jhonemillan@teclalabs.com',
            password: '1234567'
        };

        request(app)
        .post('/api/add')
        .send(usuario)        
        .expect(200)
        .end((err)=>{
            if(err){
                return done(err);
            }

            done();
        })

       
      });
    });
  });

  describe('GET /users', function() {
    it('respond with json', function(done) {
      request(app)
        .get('/api/users')                
        .expect(200)        
        .end((err, res)=>{
            if(err){
               return done(err);
            }
            done();
        });
    });
  });

  describe('GET /users/:id',function(){
    it('response with user', (done)=>{
      request(app)
      .get('/api/users/5a3c4c9f7bdc8926863f062d')
      .expect(200)      
      .end((err, res)=>{
        if(err){
           return done(err);
        }
        done();
    });
    })
  });

  describe('DELETE /api/users/del/:id',function(){
    it('response with user', (done)=>{
      request(app)
      .delete('/api/users/del/')
      .expect(404)     
      .end((err)=>{
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });