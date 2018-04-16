const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
const saltRounds = 10;

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name cannot be empty']
  },
  email: {
    type: String,
    unique: [true, 'email sudah terdaftar'],
    validate: {
      validator: function(email){
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
      },
      message: 'email salah'
    },
    required: [true, 'name cannot be empty']
  },
  role: {
    type: String,
  },
  posts:[{
    type: Schema.Types.ObjectId,
    ref: "posts"
  }]
  },{
    timestamps: true
})

userSchema.methods.passwordValidate = function(password){
  return new Promise(function(resolve, reject){
      if( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(String(password))){
          resolve()
      }else{
          let err = {
              message: "password at least 8 characters and contains at least one number, one uppercase, and one lowercase"
          }
          reject(err)
      }
  })
}
userSchema.methods.comparePassword = function(plain_password, hash, cb){
  bcrypt.compare(plain_password, hash, function(err, result){
      if(err) throw cb(err);
      cb(null, result) 
  })
}
userSchema.methods.generateHash = function(password, cb){
  bcrypt.hash(password, saltRounds, function(err, result){
      if(err) {
          cb(err)
      }
      else{
          cb(null, result)
      }
  })
}
let Users = mongoose.model('Users', userSchema)

module.exports = Users