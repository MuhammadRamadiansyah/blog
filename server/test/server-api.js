const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app.js')
let token = ""
chai.use(chaiHttp)

describe('users check api', function(){

  // describe('sign up test api for users', function(){
  //   it('successfully sign up users', function(done){
  //     chai.request(app)
  //         .post('/users/signup')
  //         .type('form')
  //         .send({email: 'rama202122@gmail.com', password: 'rama', role: 'user', name: 'rama'})
  //         .end((err,res)=>{
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(201);
  //           expect(res.body).to.ownProperty('message')
  //           expect(res.body.message).to.equal('success register').to.be.a('string')
  //           expect(res.body).to.ownProperty('data')
  //           expect(res.body.data).to.be.a('object')
  //           expect(res.body.data).to.ownProperty('name')
  //           expect(res.body.data).to.ownProperty('email')
  //           expect(res.body.data).to.ownProperty('password')
  //           expect(res.body.data).to.ownProperty('role')
  //           expect(res.body.data.name).to.be.a('string')
  //           expect(res.body.data.email).to.be.a('string')
  //           expect(res.body.data.role).to.be.a('string')
  //           expect(res.body.data.password).to.be.a('string')
  //           done()
  //         })
  //   })
  // })

  // describe('sign in test api for users', function(){
  //   it('successfully sign in users', function(done){
  //     chai.request(app)
  //         .post('/users/signin')
  //         .type('form')
  //         .send({email: 'rama202122@gmail.com', password: 'rama'})
  //         .end((err,res)=>{
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(200);
  //           expect(res.body).to.ownProperty('message')
  //           expect(res.body.message).to.equal('success login')
  //           expect(res.body).to.ownProperty('token')
  //           expect(res.body.token).to.be.a('string')
  //           done()
  //         })
  //   })
  // })

  // describe('post new blog api for users', function(){
    
  //   before(function(done){
  //     chai.request(app)
  //         .post('/users/signin')
  //         .type('form')
  //         .send({email: 'rama202122@gmail.com', password: 'rama'})
  //         .end((err, res)=>{
  //           token = res.body.token
  //           done();
  //         })
  //   })
  //   it('successfully add new post for users', function(done){
  //     this.timeout(10000);
  //     setTimeout(done, 5000);
  //     chai.request(app)
  //         .post('/users/add')
  //         .type('form')
  //         .send({title: '1000 pastiksubisaqqqqq', content: 'awkawkw shows kakwaka wkawkkwakwa', tag: 'hiburan', status: 'public'})
  //         .set('token', token)
  //         .end((err, res)=>{
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(201)
  //           expect(res.body).to.ownProperty('result')
  //           expect(res.body.result).to.ownProperty('tag')
  //           expect(res.body.result.tag).to.be.an('string')
  //           expect(res.body.result).to.ownProperty('user')
  //           expect(res.body.result.user).to.be.a('string')
  //           expect(res.body.result).to.ownProperty('title')
  //           expect(res.body.result.title).to.be.a('string')
  //           expect(res.body.result).to.ownProperty('content')
  //           expect(res.body.result.content).to.be.a('string')
  //           expect(res.body.result).to.ownProperty('summary').to.be.a('string')
  //           done()
  //         })
  //   })
  // })

  describe('edit post blog api for users', function(){
    
    let editBlog = ""

    before(function(done){
      chai.request(app)
          .post('/users/signin')
          .type('form')
          .send({email: 'rama202122@gmail.com', password: 'rama'})
          .end((err, res)=>{
            token = res.body.token
            editBlog = res.body.user.blogs[0]
            done();
          })
    })
    it('successfully edit post for users', function(done){
      this.timeout(10000);
      setTimeout(done, 5000);
      chai.request(app)
          .put(`/users/post/edit/${editBlog}`)
          .type('form')
          .send({title: 'title blog 233336', content: 'apalah apa aja boleh 2', tag: 'games', status: 'public'})
          .set('token', token)
          .end((err, res)=>{
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res.body).to.ownProperty('result')
            expect(res.body.result).to.ownProperty('title').to.be.a('string')
            expect(res.body.result).to.ownProperty('content').to.be.a('string')
            expect(res.body.result).to.ownProperty('tag').to.be.a('string')
            expect(res.body.result).to.ownProperty('status').to.be.a('string')
            expect(res.body).to.ownProperty('message').to.be.a('string').to.equal('success edit blog')

            done()
          })
    })
  })

  // describe('get all post blog api for users', function(){
    
  //   it('successfully get all post for users', function(done){
  //     chai.request(app)
  //         .get(`/users/posts`)
  //         .set('token', token)
  //         .end((err, res)=>{
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(200)
  //           expect(res.body).to.ownProperty('user')
  //           expect(res.body.user).to.ownProperty('email').to.be.a('string')
  //           expect(res.body.user).to.ownProperty('name').to.be.a('string')
  //           expect(res.body.user).to.ownProperty('role').to.be.a('string').to.equal('user')
  //           expect(res.body.user).to.ownProperty('password').to.be.a('string')
  //           expect(res.body.user).to.ownProperty('blogs').to.be.an('array')
  //           res.body.user.blogs.forEach(element => {
  //             expect(element).to.ownProperty('title').to.be.a('string')
  //             expect(element).to.ownProperty('content').to.be.a('string')
  //           });
  //           done()
  //         })
  //   })
  // })
  
  // describe('delete post blog api for users', function(){
  //   let deleteBlog = ""
  //   before(function(done){
  //     chai.request(app)
  //         .post('/users/signin')
  //         .type('form')
  //         .send({email: 'rama15@gmail.com', password: 'rama'})
  //         .end((err, res)=>{
  //           token = res.body.token
  //           deleteBlog = res.body.user.blogs[0]
  //           console.log(deleteBlog)
  //           done();
  //         })
  //   })
  //   it('successfully edit post for users', function(done){
  //     chai.request(app)
  //         .delete(`/users/post/delete/${deleteBlog}`)
  //         .set('token', token)
  //         .end((err, res)=>{
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(200)
  //           expect(res.body).to.ownProperty('message').to.be.a('string').to.equal('delete blog success')
  //           done()
  //         })
  //   })
  // })


  // describe('report post blog api for users', function(){
  //   let reportBlog = ""
  //   before(function(done){
  //     chai.request(app)
  //         .post('/users/signin')
  //         .type('form')
  //         .send({email: 'rama15@gmail.com', password: 'rama'})
  //         .end((err, res)=>{
  //           token = res.body.token
  //           reportBlog = res.body.user.blogs[0]
  //           done();
  //         })
  //   })
  //   it('successfully get all other users post for users', function(done){
  //       chai.request(app)
  //           .get(`/users/posts`)
  //           .end((err, res)=>{
  //             expect(err).to.be.null;
  //             expect(res).to.have.status(200)
  //             expect(res.body).to.ownProperty('message').to.be.a('string').to.equal('success get all posts')
  //             expect(res.body).to.ownProperty('blogs').to.be.an('array')
  //             reportBlog = '5ad6109ebc1e3e2ba8ee7fa2'
  //             done()
  //           })
  //     })
  //   it('successfully patch post for users', function(done){
  //     chai.request(app)
  //         .patch(`/users/post/${reportBlog}`)
  //         .set('token', token)
  //         .end((err, res)=>{
  //           expect(err).to.be.null;
  //           expect(res).to.have.status(200)
  //           expect(res.body).to.ownProperty('message').to.be.a('string').to.equal('success report blog')
  //           expect(res.body).to.ownProperty('reportBlog').to.be.an('object')
  //           expect(res.body.reportBlog).to.ownProperty('report').to.equal(true)

  //           done()
  //         })
  //   })
  // })

  // describe('get all report post blog api for users', function(){
  //     let reportBlog = '5ad610aa4d8f842bb3ca107c'
  //     before(function(done){
  //       chai.request(app)
  //           .post('/users/signin')
  //           .type('form')
  //           .send({email: 'rama20@gmail.com', password: 'rama'})
  //           .end((err, res)=>{
  //             token = res.body.token
  //             done();
  //           })
  //     })
  //     it('successfully get all report post for users', function(done){
  //       chai.request(app)
  //           .get(`/users/report/post`)
  //           .set('token', token)
  //           .end((err, res)=>{
  //             expect(err).to.be.null;
  //             expect(res).to.have.status(200)
  //             expect(res.body).to.ownProperty('message').to.be.a('string').to.equal("success get all report message")
  //             expect(res.body).to.ownProperty('reportBlogs').to.be.an('array')
  //             res.body.reportBlogs.forEach(element => {
  //               expect(element).to.ownProperty('report').to.equal(true)
  //             });
  //             done()
  //           })
  //     })
  //   })

  //   describe('delete report post blog api for users', function(){
  //     let reportBlog = '5ad610aa4d8f842bb3ca107c'
  //     before(function(done){
  //       chai.request(app)
  //           .post('/users/signin')
  //           .type('form')
  //           .send({email: 'rama20@gmail.com', password: 'rama'})
  //           .end((err, res)=>{
  //             token = res.body.token
  //             done();
  //           })
  //     })
  //     it('successfully get all report post for users', function(done){
  //       chai.request(app)
  //           .delete(`/users/report/post/${reportBlog}`)
  //           .set('token', token)
  //           .end((err, res)=>{
  //             expect(err).to.be.null;
  //             expect(res).to.have.status(200)
  //             // expect(res.body).to.ownProperty('message').to.be.a('string').to.equal("success delete report post")
  //             done()
  //           })
  //     })
  //   })

  //   describe('accept report post blog api for users', function(){
  //     let reportBlog = '5ad6109ebc1e3e2ba8ee7fa2'
  //     before(function(done){
  //       chai.request(app)
  //           .post('/users/signin')
  //           .type('form')
  //           .send({email: 'rama20@gmail.com', password: 'rama'})
  //           .end((err, res)=>{
  //             token = res.body.token
  //             done();
  //           })
  //     })
  //     it('successfully accept report post for users', function(done){
  //       chai.request(app)
  //           .patch(`/users/report/post/${reportBlog}`)
  //           .set('token', token)
  //           .end((err, res)=>{
  //             expect(err).to.be.null;
  //             expect(res).to.have.status(200)
  //             expect(res.body).to.ownProperty('message').to.be.a('string').to.equal("this blog is not contains harmful content")
  //             expect(res.body).to.ownProperty('blog').to.be.a('object')
  //             expect(res.body.blog).to.ownProperty('report').to.equal(false)
  //             done()
  //           })
  //     })
  //   })
})