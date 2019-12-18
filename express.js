const app = require('express')()
const bodyParser = require('body-parser')
const port = 3000
const cors = require('cors')
const router = require('./routes/router')
const cookieParser = require('cookie-parser');
const passport = require('passport')
const User = require('./models/User')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy; 
const MongoStore = require('connect-mongo')(session);

const mongoose = require('./database/mongoose')
require('dotenv').config()


// MIDDLEWARES

app.use(cookieParser('saori'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))

// app.use(cookieSession({
//   name: 'mysession',
//   keys: ['keyboard cat'],
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))


app.use(session({
  secret: 'saori',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ url: process.env.MONGOURI})

}))

app.use(cors({credentials: true, origin: 'http://localhost:8080'}))

// AUTH
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
// passport.use(new LocalStrategy(User.authenticate())); 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api', router)

// SERVER

app.listen(port, function () {
    console.log('Rolando o server')

  })

module.exports = app