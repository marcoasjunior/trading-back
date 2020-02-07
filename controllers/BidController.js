const Trading = require('../models/Trading')
const Bid = require('../models/Bid')

module.exports = {

    create: (req, res, next) => {

        let user = req.user
        let bid = new Bid({
            bid: req.body.bid,
            obs: req.body.obs,
            type: req.body.type,
            company: user.company,
            item: req.body.idItem,
            trading: req.body.idTrading
        })

        bid.save()
            .then(result => {
                console.log(result)
            })
            .then(Trading.findOneAndUpdate({
                    _id: req.body.idTrading
                }, {
                    $push: {
                        bids: bid._id
                    }
                })
                .exec(function (err, response) {
                    if (err) return handleError(err);
                    res.json(response)
                }))
            .catch(err => {
                handleError(err)
            })
    },

    getBids: (req, res, next) => {

        Trading.findById(req.params.id, 'bids').populate('bids').exec(function (err, response) {
            if (err) return handleError(err);

            res.json(response)

        })


    },

    getProposalBids: (req, res, next) => {
        let user = req.user
        // Trading.findById(req.params.id, 'bids').populate('bids').populate({
        //     path: 'bids',
        //     populate: { path: 'item' }
        //   }).exec(function (err, response) {
        //         if (err) return handleError(err);


        //         res.json(response)

        //     })

        Bid.find({
            trading: req.body.id,
            company: user.company
        }, 'item').populate('item').exec(function (err, response) {
            if (err) return handleError(err);

            res.json(response)

        })
    },

    activate: (req, res, next) => {

        Bid.findByIdAndUpdate(req.body.id, {
            'status': 'active'
        }).exec(function (err, response) {
            if (err) return handleError(err);
            res.json(response)
            console.log(response)
        })

    },
    disable: (req, res, next) => {

        Bid.findByIdAndUpdate(req.body.id, {
            'status': 'disable'
        }).exec(function (err, response) {
            if (err) return handleError(err);
            res.json(response)
            console.log(response)
        })



    }



}