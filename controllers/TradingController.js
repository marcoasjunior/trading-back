const Trading = require('../models/Trading')

module.exports = {

    getTrading: (req, res, next) => {

        let user = req.user

        // Company.findById(user.company)
        //     .populate('users')
        //     .exec(function (err, response) {
        //         if (err) return handleError(err);
        //         res.json(response.users)
        //     })

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