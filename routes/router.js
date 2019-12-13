var express = require('express')
var router = express.Router()
const UserController = require('../controllers/UserController');
const CompanyController = require('../controllers/CompanyController');

router.post('/register/user', UserController.create)
router.post('/register/company', CompanyController.create)

module.exports = router