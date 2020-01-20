const mongoose = require('../database/mongoose')

const TradingSchema = new mongoose.Schema({

    number: {
        type: String,
        require: true
    },
    notice: {
        type: String,
        require: true
    },
    target: {
        type: String,
        require: true,
    },
    startDate: {
        type: String,
        require: true,
    },
    endDate: {
        type: String,
        require: true,
    },
    startTime: {
        type: String,
        require: true,
    },
    endTime: {
        type: String,
        require: true,
    },
    evaluation: {
        type: String,
        require: true
   
    },
    sellers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    buyers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    bids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid'
    }],
    users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],       
    step: {
        type: String,
   
    },
    
}, {
    timestamps: true,
    versionKey: false
})

const Trading = mongoose.model('Trading', TradingSchema, 'trading')

module.exports = Trading