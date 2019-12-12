const app = require('express')()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const cors = require('cors')

require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }))


app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, function () {
    console.log('Rolando o server')

  })