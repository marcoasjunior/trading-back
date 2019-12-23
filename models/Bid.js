const mongoose = require('../database/mongoose')

const BidSchema = new mongoose.Schema({
    
    value: mongoose.Decimal128,
    company: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],

}, {
    timestamps: true,
    versionKey: false 
})

const Bid = mongoose.model('Bid', BidSchema, 'bids')

module.exports = Bid