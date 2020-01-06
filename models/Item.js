const mongoose = require('../database/mongoose')

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,

    },
    quantity: {
        type: Number
    },
    price: mongoose.Decimal128
    ,
    
    category: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false 
})

const Item = mongoose.model('Item', ItemSchema, 'items')

module.exports = Item