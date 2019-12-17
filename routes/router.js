var express = require('express')
var passport = require('passport')
var router = express.Router()
const multer = require('multer')
const storage = require('../util/multer')
const upload = multer({
    storage: storage
})
const UserController = require('../controllers/UserController');
const CompanyController = require('../controllers/CompanyController');
const User = require('../models/User')


router.post('/register/user', UserController.create)
router.post('/register/company', upload.single('file'), CompanyController.create)
router.post('/login', passport.authenticate('local'), (req, res) => {
                                        console.log('entrou')
                                        User.findOne({
                                        username: req.body.username
                                        }, (err, person) => {
                                        
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json({
                                            success: true,
                                            status: 'You are successfully logged in!'
                                            
                                        });
                                        })
                                    });



module.exports = router