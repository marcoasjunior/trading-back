const mongoose = require('../database/mongoose')

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
    timestamps: true,
    versionKey: false 
})

const User = mongoose.model('User', UserSchema, 'users')

module.exports = User