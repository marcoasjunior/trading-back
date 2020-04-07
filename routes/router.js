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
const TradingController = require('../controllers/TradingController')
const BidController = require('../controllers/BidController')
require('dotenv').config()
const jwt = require('express-jwt')
const auth = jwt({secret: process.env.SUPERSECRET})

// Basic Descrypt Auth Token

router.get('/profile', auth, (req, res) => {res.json(req.user)})

// Getters

router.get('/getUsers', auth, CompanyController.getUsers)
router.get('/getItems', auth, CompanyController.getItems)
router.get('/getTrading', auth, TradingController.getTrading)
router.get('/getTradingStep/:id', auth, TradingController.getTradingStep)
router.get('/getTradingItems/:id', auth, TradingController.getTradingItems)
router.get('/getProposalBids/:id', auth, BidController.getProposalBids)
router.get('/getRankedBids/:id', auth, BidController.getRankedBids)
router.get('/getWinners/:id', auth, BidController.getWinners)
router.get('/getBids/:id', auth, BidController.getBids)

// Register

router.post('/register/item', [auth, upload.single('file')], ItemController.create)
router.post('/register/company', upload.single('file'), CompanyController.create)
router.post('/register/user', [auth, upload.single('file')],  UserController.create)
router.post('/register/trading', [auth, upload.single('file')],  TradingController.create)
router.post('/register/proposal', [auth, upload.single('file')],  BidController.create)
router.post('/register/deal', [auth, upload.single('file')],  BidController.create)


// Edit/Update

router.post('/edit/item', [auth, upload.single('file')], ItemController.edit)
router.post('/edit/user', [auth, upload.single('file')], UserController.edit)
router.post('/update/step', auth, TradingController.step)
router.post('/activate/proposal', auth, BidController.activate)

// Delete/Cancel

router.post('/delete/item', auth, ItemController.delete)
router.post('/delete/user', auth, UserController.delete)
router.post('/cancel/trading', auth, TradingController.cancel)
router.post('/disable/proposal', auth, BidController.disable)

// login
  
router.post('/login', passport.authenticate('local', {session: false}), UserController.login)


module.exports = router