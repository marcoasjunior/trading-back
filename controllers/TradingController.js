const Trading = require('../models/Trading')

module.exports = {

    getTrading: (req, res, next) => {

        Trading.find()
            .exec(function (err, response) {
                if (err) return handleError(err);
                console.log(response)
                res.json(response)
            })

    },

    cancel: (req, res, next) => {
        console.log(req.body)

        Trading.findByIdAndDelete(req.body.id)
            .exec(function (err, response) {
                if (err) return handleError(err);
                console.log(response)
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
            buyers: user.company


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