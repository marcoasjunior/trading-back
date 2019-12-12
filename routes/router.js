var express = require('express')
var router = express.Router()
const UserController = require('../controllers/UserController');

router.post('/register', UserController.create)

module.exports = router