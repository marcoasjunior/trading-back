const app = require('express')()
const bodyParser = require('body-parser')
const port = 3000
const cors = require('cors')
const router = require('./routes/router')
const passport = require('passport')
const User = require('./models/User')
const mongoose = require('mongoose')
require('dotenv').config()
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;




// MIDDLEWARES

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))

app.use(cors({credentials: true, origin: 'http://localhost:8080'}))


// Configure passport middleware

app.use(passport.initialize());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'ILovePokemon'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));



// Register routes
app.use('/api', router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});



// SERVER

app.listen(port, function () {
    console.log('Rolando o server')

  })

module.exports = app