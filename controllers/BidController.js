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

    async getProposalBids(req, res) {

        let data = await Bid
            .find({
                trading: req.params.id,
            }, async function (err, response) {
                if (err) return res.json(err);
            }).populate('item', 'name')

        let formatedData = data.map(element => { 

            // Coloquei o nome no type porque não consegui fazer de outra forma                          

            element.type = element.item.name
            return element

        })

        // --------------- Dividir propostas unicas e multiplas ------------- //

        let multi = [] // Itens com mais de uma proposta
        let single = [] // Itens Propostas unicas
        let idArray = [] // Id para ser se é repetido


        formatedData.forEach((element) => {

            
            let filterArray = formatedData.filter((element2) => {

                if (idArray.includes(String(element2._id))) return false
                
                return element2.type === element.type;
                
            })
            
            
            if (filterArray.length === 1) return single.push(element)
            if (filterArray.length > 0) {
                
                multi.push(filterArray)
                idArray.push(String(element._id))
                
            } 
            
        })

        // --------------- Colocar winner nas propostas únicas ------------- //

        for await (let bid of single) {

            if (bid.status === 'disable') {

                await Bid
                    .findByIdAndUpdate(bid._id, {
                        winner: false,
                        status: 'disable'
                    }, function (err, res) {
                        if (err) return res.json(err);

                    })
            }

            if (bid.status === 'active') {

                await Bid
                    .findByIdAndUpdate(bid._id, {
                        winner: true,
                        status: 'active'
                    }, function (err, res) {
                        if (err) return res.json(err);

                    })
            }
        }

        for await (let [i, array] of multi.entries()) {

                let sorted = array.sort((a, b) => {

                    const bid1 = parseFloat(parseFloat(a.bid))
                    const bid2 = parseFloat(parseFloat(b.bid))
                
                    let comparison = 0;
                    if (bid1 > bid2) {
 //                   if (bid1 > bid2 && a.status === 'active') {
                      comparison = 1;
                    } else if (bid1 < bid2) {
                      comparison = -1;
                    }

                    return comparison;
                  })

// LIDAR COM O RESTO DO ARRAY - COLOCAR PARA SORT PARA SÓ ATIVOS

                //   await Bid
                //     .findByIdAndUpdate(sorted[0]._id, {
                //         winner: true,
                //         status: 'active'
                //     }, function (err, res) {
                //         if (err) return res.json(err);

                //     })

                let remainder = sorted.slice(0, 1)

                console.log(remainder)

                


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