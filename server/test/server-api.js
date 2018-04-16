const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app.js')
chai.use(chaiHttp)


describe('users check api', function(){
  describe('sign up test api for users', function(){
    it('successfully sign up users', function(done){
      chai.request(app)
          .post('/users/signup')
          .type('form')
          .send({email: 'rama@gmail.com', password: 'test', role: 'test', name: 'test'})
          .end((err,res)=>{
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.ownProperty('message')
            expect(res.body.message).to.equal('success register').to.be.a('string')
            expect(res.body).to.ownProperty('data')
            expect(res.body.data).to.be.a('object')
            expect(res.body.data).to.ownProperty('name')
            expect(res.body.data).to.ownProperty('email')
            expect(res.body.data).to.ownProperty('password')
            expect(res.body.data).to.ownProperty('role')
            expect(res.body.data.name).to.be.a('string')
            expect(res.body.data.email).to.be.a('string')
            expect(res.body.data.role).to.be.a('string')
            expect(res.body.data.password).to.be.a('string')
            done()
          })
    })
  })

  describe('sign in test api for users', function(){
    it('successfully sign in users', function(done){
      chai.request(app)
          .post('/users/signin')
          .type('form')
          .send({email: 'rama', password: 'test'})
          .end((err,res)=>{
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.ownProperty('message')
            expect(res.body.message).to.equal('success login')
            done()
          })
    })
  })

  describe('post new blog api for users', function(){
    it('successfully add new post for users', function(done){
      chai.request(app)
          .post('/users/add/post')
          .type('form')
          .send({title: 'text', text: 'test dulu'})
          .end((err, res)=>{
            expect(err).to.be.null;
            expect(res).to.have.status(201)
            done()
          })
    })
  })

  // describe('get all post test api for users', function(){
  //   it('successfully')
  // })
  
})