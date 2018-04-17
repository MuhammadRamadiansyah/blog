const Users = require('../models/users.models')
const Blogs = require('../models/blogs.models')
const Tags = require('../models/tags.model')
const saltRounds = 10;
const secretKey = process.env.secret
const jwt = require('jsonwebtoken')


module.exports = {

  signup: function(req, res){

    let newData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    }

    let user = new Users(newData)
    Users.schema.methods.generateHash(user.password, function(err, result){
      if(err) res.status(500).json({message: err.message});
      user.password = result;
      user.save()
        .then(data=>{
          res.status(201).json({
            data,
            message:"success register"
          })
        })
        .catch(err=>{
          res.status(400).json({
            message: err.message
          })
        })
    })
    
  },
  signin: function(req, res){
    let email = req.body.email
    let password = req.body.password

    Users.findOne({email: email})
         .exec()
         .then(user=>{
          if(user == null){
            res.status(404).json({
              message: "email is wrong"
            })
          }else{
            Users.schema.methods.comparePassword(password, user.password, function(err, result){
              if(err) {
                res.status(404).json({message: err.message});
              }
              let token = jwt.sign({id: user._id, email: user.email, role: user.role}, secretKey)
              res.status(200).json({
                message: "success login",
                token,
                user
              })
            })     
          }
         })
         .catch(err=>{
           res.status(400).json({
             message: err.message
           })
         })
  },
  myPosts: function(req, res){
    let user = req.decoded
    Users.findOne({_id: user.id})
         .populate('blogs')
         .exec()
         .then(user=>{
           
          res.status(200).json({
            user
          })
         })
         .catch(err=>{
           res.status(500).json({
             message: err.message
           })
         })  
  },
  newPost: function(req, res){

    let user = req.decoded
    Tags.findOne({category: req.body.tags})
        .exec()
        .then(tag=>{
          if(tag==null){
            let newTagData = {
              category: req.body.tags,
            }
            let tag = new Tags(newTagData)
            tag.save()
               .then(newTag =>{
                  let newArticle = {
                    user: user.id,
                    title: req.body.title,
                    content: req.body.content,
                    tags: newTag._id,
                    report: false,
                  }
                  let blog = new Blogs(newArticle)
                  blog.save()
                      .then(newBlog=>{
                        let updateData = {
                          $push: {blogs: newBlog._id},
                          updatedAt: new Date()
                        }
                        Tags.findOneAndUpdate({_id: tag._id}, updateData)
                            .then(updateData=>{
                              let updateBlog = {
                                $push: {blogs: newBlog._id},
                              }
                              Users.findOneAndUpdate({_id: user.id}, updateBlog)
                                   .then(result=>{
                                      res.status(201).json({
                                        result,
                                        updateData,
                                        newBlog,
                                        message: "success add one new post",
                                      })
                                   })
                                   .catch(err=>{
                                     res.status(500).json({
                                       message: err.message
                                     })
                                   })
                            })
                            .catch(err=>{
                              res.status(500).json({
                                message: err.message
                              })
                            }) 
                      })
                      .catch(err=>{
                        res.status(500).json({
                          message: err.message
                        })
                      })
               })
               .catch(err=>{
                 res.status(500).json({
                   message: err.message
                 })
               })
          }else{
            let newArticle = {
              user: user.id,
              title: req.body.title,
              content: req.body.content,
              tags: tag._id,
              report: false,
            }
            let blog = new Blogs(newArticle)
            blog.save()
                .then(newBlog=>{

                  let updateData = {
                    $push: {blogs: newBlog._id},
                    updatedAt: new Date()
                  }
                  Tags.findOneAndUpdate({_id: tag._id}, updateData)
                      .then(updateData=>{
                        let updateBlog = {
                          $push: {blogs: newBlog._id},
                        }
                        Users.findOneAndUpdate({_id: user.id}, updateBlog)
                             .then(result=>{
                                res.status(201).json({
                                  result,
                                  updateData,
                                  newBlog,
                                  message: "success add one new post",
                                })
                             })
                             .catch(err=>{
                               res.status(500).json({
                                 message: err.message
                               })
                             })
                      })
                      .catch(err=>{
                        res.status(500).json({
                          message: err.message
                        })
                      }) 
                })
                .catch(err=>{
                  res.status(500).json({
                    message: err.message
                  })
                })
          }
        })
        .catch(err=>{

        })
  },
  editPost: function(req, res){
    let getId = req.params.id
    let newData = {
      title: req.body.title,
      content: req.body.content,
      updatedAt: new Date()
    }
    Blogs.findOneAndUpdate({_id: getId}, newData)
         .then(result=>{
            res.status(200).json({
              result,
              message: "success edit blog"
            })
         })
         .catch(err=>{
           res.status(500).json({
             message: err.message
           })
         })   
  },
  deletePost: function(req, res){

    // let dummyTag = '5ad5c6143e029714033b1a63' 
    // let dummyUser = '5ad5929844d6fe05e7b77d3d'
    let getId = req.params.id   
    console.log(getId)
    Blogs.findOne({_id: getId})
         .exec()
         .then(userData=>{
           if(userData == null){
             res.status(404).json({
               message: "blog is not found"
             })
           }else{

            let deleteId = {
              _id: getId,
              user: userData.user
            }
            let blog = new Blogs(deleteId)
            blog.remove()
                .then(hasil=>{
                    res.status(200).json({
                      message: "delete blog success"
                  })
                })
                .catch(err=>{
                  res.status(500).json({
                    message: err.message
                  })
                })
           }
         })
         .catch(err=>{
           res.status(500).json({
             message: err.message
           })
         })
    // Users.findOne({_id: dummyUser})
    //     .exec()
    //     .then(result=>{
    //       console.log(result,'ini adalah tagnya')
    //       res.status(200).json({
    //         message: "success delete your blog"
    //       })
    //     })
    //     .catch(err=>{
    //       res.status(500).json({
    //         message: err.message
    //       })
    //     })
    
  },
  reportPost: function(req, res){
    let getId = req.params.id
    let reportData = {
      updatedAt: new Date(),
      report: true,
    }
    Blogs.findOneAndUpdate({_id: getId}, reportData)
         .then(reportBlog=>{
          res.status(200).json({
            reportBlog,
            message: "success report blog"
          })
         })
         .catch(err=>{
          res.status(500).json({
            message: err.message
          })
         })
    
    
  },
  getAllPosts: function(req, res){
    
    Blogs.find()
         .populate('tags')
         .exec()
         .then(blogs=>{
          res.status(200).json({
            message: "success get all posts",
            blogs
          })
         })
         .catch(err=>{
           res.status(500).json({
             message: err.message
           })
         })
  },
  getAllReportPost: function(req, res){

    Blogs.find({report: true})
         .exec()
         .then((reportBlogs)=>{
           console.log(reportBlogs,'ini loh hasilnya')
            res.status(200).json({
              message: "success get all report message",
              reportBlogs,
            })
         })
         .catch(err=>{
            res.status(500).json({
              message: err.message
            })
         })    
   
  },
  deleteReportPost: function(req, res){
    let getId = req.params.id   
    console.log(getId)
    Blogs.findOne({_id: getId})
         .exec()
         .then(blogData=>{
           if(blogData == null){
             res.status(404).json({
               message: "blog is not found"
             })
           }else{

            let deleteId = {
              _id: getId,
              user: blogData.user
            }
            let blog = new Blogs(deleteId)
            blog.remove()
                .then(hasil=>{
                    res.status(200).json({
                      message: "success delete report post"
                  })
                })
                .catch(err=>{
                  res.status(500).json({
                    message: err.message
                  })
                })
           }
         })
         .catch(err=>{
           res.status(500).json({
             message: err.message
           })
         })
  },
  acceptReportPost: function(req, res){

    let getId = req.params.id
    let updateData = {
      updatedAt: new Date,
      report: false,
    }
    Blogs.findOneAndUpdate({_id: getId}, updateData)
         .then(blog=>{
            res.status(200).json({
              message: "this blog is not contains harmful content",
              blog
            })
         })
         .catch(err=>{
           res.status(500).json({
             message: err.message
           })
         })
  }
}