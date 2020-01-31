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
            item: req.body.idItem
        })
        
        bid.save()
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                handleError(err)
            })
        
            console.log(req.body.idTrading)

        Trading.findOneAndUpdate({
            _id: req.body.idTrading
        }, {
            $push: {
                bids: bid._id
            }
        })

        .exec(function (err, response) {
            if (err) return handleError(err);
            res.json(response)
        })

    },

    edit: (req, res, next) => {

  

    },

    activate: (req, res, next) => {
        let user = req.user
        Bid.findByIdAndUpdate(req.body.id, {'status': 'active'}).exec(function (err, response) {
            if (err) return handleError(err);
            res.json(response)
            console.log(response)
        })

    },
    disable: (req, res, next) => {
        let user = req.user
        Bid.findByIdAndUpdate(req.body.id, {'status': 'disable'}).exec(function (err, response) {
            if (err) return handleError(err);
            res.json(response)
            console.log(response)
        })



    }
                
       

}