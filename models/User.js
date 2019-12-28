const mongoose = require('../database/mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    
    contact: {
        type: String
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false 
})

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', UserSchema, 'users')

module.exports = User