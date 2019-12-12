const app = require('express')()
const bodyParser = require('body-parser')
const port = 3000
const cors = require('cors')
const router = require('./routes/router')

require('dotenv').config()

// MIDDLEWARES


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use('/api', router)

app.listen(port, function () {
    console.log('Rolando o server')

  })

module.exports = app