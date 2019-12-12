const app = require('express')()

const User = require('../models/User')

app.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.send({user})
    } catch (error) {
        return res.statusCode(400).send({error: 'Registration failed' })
        
    }
})