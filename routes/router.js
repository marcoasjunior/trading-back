const express = require('express')
const passport = require('passport')
const router = express.Router()
const multer = require('multer')
const storage = require('../util/multer')
const upload = multer({
    storage: storage
})
const UserController = require('../controllers/UserController');
const CompanyController = require('../controllers/CompanyController');
require('dotenv').config()
const jwt = require('express-jwt')
const auth = jwt({secret: process.env.SUPERSECRET})

router.post('/register/company', upload.single('file'), CompanyController.create)

router.get('/profile', auth, (req, res) => {
   let user = req.user

    res.send(user)
  })
  
router.post('/login', passport.authenticate('local', {session: false}), UserController.login)


module.exports = router