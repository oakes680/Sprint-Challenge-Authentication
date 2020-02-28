const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../secrets/secrets')


module.exports = (req, res, next) => {
  const token = req.headers.authorization
  console.log('dadasdas', token)

  if(token){
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err){
        res.status(401).json({message: 'Token is invalid'})
      } else {
        console.log(decodedToken)
        req.user = decodedToken
        next()
      }
    })
  } else {
    res.status(401).json({message: 'you do not have a token!!!!'})
  } 
};



