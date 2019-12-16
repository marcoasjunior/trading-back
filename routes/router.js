var express = require('express')
var router = express.Router()
const multer = require('multer')
const storage = require('../util/multer')
const upload = multer({
    storage: storage
})
const UserController = require('../controllers/UserController');
const CompanyController = require('../controllers/CompanyController');

router.post('/register/user', UserController.create)
router.post('/register/company', upload.single('file'), CompanyController.create)

module.exports = router