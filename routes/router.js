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




router.post('/register/user', UserController.create)
router.post('/register/company', upload.single('file'), CompanyController.create)
router.post('/login', passport.authenticate('local'), UserController.login)



router.get('/login', function(req, res) {
    res.send([req.user, req.session]);
  })

router.get('/loginn', function(req, res) {
    res.cookie('cookie_token',{ maxAge: 900000 })
  })
  



router.get("/api/logout", function (req, res) {

    req.logout()

    console.log("logged out")

    return res.send()
})



module.exports = router