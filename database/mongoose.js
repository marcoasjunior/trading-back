const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true})

module.exports = mongoose