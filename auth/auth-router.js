const AuthModel= require('./auth-models')
const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../secrets/secrets')



router.post('/register', (req, res) => {
    const userData = req.body
    const hash = bcrypt.hashSync(userData.password, 12)
    userData.password = hash

    AuthModel.register(userData)
    .then(user => {
      res.status(201).json({message: `congrats ${userData.username} you successfully registered`})
    })
    .catch(err => {
      res.status(500).json({message: `there was an error registering`})
    })
});




router.post('/login', (req, res) => {
  const {username, password} = req.body
  AuthModel.login({username})
  .first()
  .then(user => {
    console.log(user)
    if(user && bcrypt.compareSync(password, user.password)){
      console.log('hihihihi')

      const token = generateToken(user)
      console.log(token)
      res.status(200).json({token, id: user.id})

    } else {
      res.status(401).json({message: `invalid credentials, get out!`})
    }
  })
  .catch(err => {
    res.status(500).json({message: `there was an error logging in `})
  })
});


function generateToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }
  
  return jwt.sign(payload, jwtSecret, options)
}
module.exports = router;
