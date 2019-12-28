const mongoose = require('../database/mongoose')
const Item = require('./Item')
const Bid = require('./Bid')

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
     
    },
    endDate: {
        type: String,
   
    },
    evaluation: {
        type: String,
        require: true
   
    },
    companies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    items: [Item],
    bids: [Bid],
    team: {
        admin: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        authority: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]          
    },
    phase: {
        type: String,
   
    },
    
}, {
    timestamps: true,
    versionKey: false
})

const Trading = mongoose.model('Trading', TradingSchema, 'trading')

module.exports = Trading