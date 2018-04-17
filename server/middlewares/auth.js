const jwt = require('jsonwebtoken')
const secretKey = process.env.secret

module.exports = {
  authLogin: function (req, res, next){
    let token = req.headers.token
    jwt.verify(token, secretKey, function(err, result){
      if(err) res.status(403).json({message: err.message});
      req.decoded = result
      next()
    })
  },
  authAdmin: function(req, res, next){
    
    if(req.decoded.role == 'admin') next();
    else{
      res.status(403).json({
         message: "youre not allowed to access this page"
      })
    }
   
  }
}