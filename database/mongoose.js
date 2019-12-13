const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true,
useUnifiedTopology: true})

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

module.exports = mongoose