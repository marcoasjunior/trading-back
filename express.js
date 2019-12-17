const app = require('express')()
const bodyParser = require('body-parser')
const port = 3000
const cors = require('cors')
const router = require('./routes/router')
const passport = require('passport')
const User = require('./models/User')
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser');
var session = require('express-session')

require('dotenv').config()

// MIDDLEWARES

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))
app.use(cors())

// AUTH

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)


passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// SERVER

app.listen(port, function () {
    console.log('Rolando o server')

  })

module.exports = app