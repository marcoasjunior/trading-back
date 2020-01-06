const express = require('express')
const passport = require('passport')
const router = express.Router()
const multer = require('multer')
const storage = require('../util/multer')
const upload = multer({
    storage: storage
})
const UserController = require('../controllers/UserController')
const CompanyController = require('../controllers/CompanyController')
const ItemController = require('../controllers/ItemController')
require('dotenv').config()
const jwt = require('express-jwt')
const auth = jwt({secret: process.env.SUPERSECRET})

// Basic Descrypt Auth Token

router.get('/profile', auth, (req, res) => {res.json(req.user)})

// Getters

router.get('/getUsers', auth, CompanyController.getUsers)
router.get('/getItems', auth, CompanyController.getItems)

// Register

router.post('/register/item', [auth, upload.single('file')], ItemController.create)
router.post('/register/company', upload.single('file'), CompanyController.create)
router.post('/register/user', [auth, upload.single('file')],  UserController.create)


  
router.post('/login', passport.authenticate('local', {session: false}), UserController.login)


module.exports = router