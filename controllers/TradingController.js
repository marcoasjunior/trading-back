const Trading = require('../models/Trading')
const upperFirstLetter = require('../util/upperFirstLetter')

module.exports = {

    getTrading: (req, res, next) => {

        Trading.find()
            .exec(function (err, response) {
                if (err) return res.json(err)

                res.json(response)
            })

    },

    getTradingItems: (req, res, next) => {

        Trading.findById(req.params.id, 'items').populate('items').exec(function (err, response) {
            if (err) return res.json(err);

            res.json(response)
        })
    },

    getTradingStep: (req, res, next) => {

        let data

        Trading.findById(req.params.id, 'step').exec(function (err, response) {
            if (err) return res.json(err);

            data = upperFirstLetter(response.step)

            res.json(data)
        })
    },

    cancel: (req, res, next) => {
        console.log(req.body)

        Trading.findByIdAndDelete(req.body.id)
            .exec(function (err, response) {
                if (err) return res.json(err);

                res.json(response)
            })

    },
    step: (req, res, next) => {

        Trading.findByIdAndUpdate(req.body.id, {
                'step': req.body.step
            })
            .exec(function (err, response) {
                if (err) return res.json(err);

                res.json(response)
            })

    },

    create: (req, res) => {

        let user = req.user
        let users = req.body.users.split(',')
        let items = req.body.items.split(',')
        let trading = new Trading({

            number: req.body.number,
            notice: req.body.notice,
            target: req.body.target,
            evaluation: req.body.evaluation,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            items: items,
            users: users,
            buyers: user.company,
            step: req.body.step


        })

        console.log(trading)

        trading.save()
            .then(result => {
                res.json({
                    success: true,
                    result: result
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    result: err
                })
            })

    },


}