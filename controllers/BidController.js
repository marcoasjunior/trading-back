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

    async getProposalBids(req, res, next) {

        let findElements = await Bid
            .find({
                trading: req.params.id,
            }, async function (err, response) {
                if (err) return res.json(err);

                response.forEach(element => {

                    element.type = element.item.name

                    return element

                }) 

                // Coloquei o nome no type porque não consegui fazer de outra forma               

                return response

            }).populate('item', 'name')  

        // --------------- Colocar winner nas propostas únicas ------------- //

        // --------------- Dividir propostas unicas e multiplas ------------- //

        let array1 = [] // Items com mais de uma proposta
        let single = [] // Itens Propostas unicas

        findElements.forEach((element, i) => {

            let array2 = []

            findElements.forEach((element2, j) => {

                if (i === j) return null

                if (element2.type === element.type) array2.push(element2)

            })

            if (array2.length === 0) return single.push(element)
            if (array2.length > 0) return array1.push(element)


        })

        // -----------------------  REFATORAR

        for await (let bid of single) {

            console.log(bid.status)

            if (bid.status === 'disable') {

                await Bid
                    .findByIdAndUpdate(bid._id, {
                        winner: false,
                        status: 'disable'
                    }, function (err, res) {
                        if (err) return res.json(err);

                        console.log('disable')

                    })
            }

            if (bid.status === 'active') {

                await Bid
                    .findByIdAndUpdate(bid._id, {
                        winner: true,
                        status: 'active'
                    }, function (err, res) {
                        if (err) return res.json(err);

                        console.log('active')


                    })
            }
        }

        await Bid
            .find({
                trading: req.params.id,
            }, async function (err, response) {
                if (err) return res.json(err);

                response.forEach(element => {

                    element.type = element.item.name

                    return element

                }) 

                // Coloquei o nome no type porque não consegui fazer de outra forma               

                res.json(response)

            }).populate('item', 'name')  

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