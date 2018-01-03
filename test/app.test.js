const expect = require('chai');
const {app} = require('../app');
const {user} = require('../model/user');
const request = require('supertest'); 

describe('api/add', function() {
    describe('#save()', function() {
      it('should save without error', function(done) {
        // var usuario = new user({
        //     name: 'test',
        //     zodiac : 'test'
        // });

        request(app)
        .post('/api/add')
        .send({name: 'test', zodiac:'Cancer'})        
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

            console.log(res.body)

            done();
        });
    });
  });