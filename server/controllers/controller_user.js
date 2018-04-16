const Users = require('../models/users.models')
const Blogs = require('../models/blogs.models.js')

module.exports = {

  signup: function(req, res){

    let newData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    }

    let user = new Users(newData)
    user.save
        .then(result=>{
          res.status(201).json({
            result,
            message:"success register"
          })
        })
        .catch(err=>{
          res.status(400).json({
            message: err.message
          })
        })
  },
  signin: function(req, res){
    let email = req.body.email
    let password = req.body.password
    res.status(200).json({
      message: "success login"
    })
  },
  getAllPosts: function(req, res){
  
  },
  newPost: function(req, res){

    let newData = {
      title: req.body.title,
      text: req.body.text
    }

    res.status(201).json({
      message: "success add one new post",
    })
  }
}