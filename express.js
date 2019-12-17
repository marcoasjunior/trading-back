const app = require('express')()
const bodyParser = require('body-parser')
const port = 3000
const cors = require('cors')
const router = require('./routes/router')
const passport = require('passport')
const User = require('./models/User');  

require('dotenv').config()

// MIDDLEWARES

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use(cors())
app.use('/api', router)

// AUTH

app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// SERVER

app.listen(port, function () {
    console.log('Rolando o server')

  })

module.exports = app