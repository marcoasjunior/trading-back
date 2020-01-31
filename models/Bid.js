const mongoose = require('../database/mongoose')

const BidSchema = new mongoose.Schema({
    
    bid: mongoose.Decimal128,
    company: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    obs: {
            type: String
    },
    type: {
        type: String
    },
    status: {
        type: String
    }

}, {
    timestamps: true,
    versionKey: false 
})

const Bid = mongoose.model('Bid', BidSchema, 'bids')

module.exports = Bid