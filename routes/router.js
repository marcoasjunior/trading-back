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


router.post('/register/company', upload.single('file'), CompanyController.create)

router.post('/profile', passport.authenticate('jwt', {session: false}), function(req, res) {
        res.send(req.user);
    }
);
  
router.post('/login', passport.authenticate('local', {session: false}), UserController.login)


module.exports = router