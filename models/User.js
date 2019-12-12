const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true

    },
    password: {
        type: String,
        require: true,

    },
    contact: {
        type: String
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = User