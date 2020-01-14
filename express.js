const app = require('express')()
const bodyParser = require('body-parser')
const port = 3000
const cors = require('cors')
const router = require('./routes/router')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User')
require('dotenv').config()

// MIDDLEWARES

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))

app.use(cors({credentials: true, origin: ['http://localhost:8080', 'http://localhost:8081' ]}))
app.use(passport.initialize())
passport.use(new LocalStrategy(User.authenticate()))

// Register routes
app.use('/api', router)

// SERVER

app.listen(port, function () {
    console.log('Rolando o server')

  })

module.exports = app