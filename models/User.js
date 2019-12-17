const mongoose = require('../database/mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

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
    
    contact: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false 
})

UserSchema.plugin(passportLocalMongoose)

UserSchema.methods.validPassword = function (password) {
    if (password === this.password) {
      return true; 
    } else {
      return false;
    }
  }

const User = mongoose.model('User', UserSchema, 'users')

module.exports = User