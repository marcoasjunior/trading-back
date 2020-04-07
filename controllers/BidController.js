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
            trading: req.body.idTrading,
            status: true
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

    getProposalBids: async function (req, res, next) {

        await Bid.find({
            trading: req.params.id,
        }).populate('item', 'name').exec(function (err, response) {
            if (err) return handleError(err);

            let change = response.forEach(element => {

                element.type = element.item.name

                return element

            })
            // Coloquei o nome no type porque não consegui fazer de outra forma

            res.json(response)

        })


    },

    getRankedBids: async function (req, res, next) {

        await Bid.find({
            trading: req.params.id,
        })

        .populate('item', 'name')

        .exec(function (err, response) {
            
            if (err) return handleError(err);

            let change = response.forEach(element => {

                element.type = element.item.name

                return element

            })
            // Coloquei o nome no type porque não consegui fazer de outra forma

            res.json(response)

        })


    },

    getWinners: async function (req, res, next) {

        await Bid.find({
            trading: req.params.id,
            winner: true
        })

        .populate('item', 'name')
        .populate('company', 'name')

        .exec(function (err, response) {

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