const User = require('../models/User')
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = {

    create: (req, res) => {
        console.log(req.body)

        let user = new User({

            name: req.body.nameContact,
            username: req.body.username,
            contact: req.body.number,

        })

        User.register(user, req.body.password, function (err, user) {
            if (err) {
                console.log(err)
            }
        });

        user.save()
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
                });
            });
    },

    login: (req, res, next) => {

        let user = req.user

        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign({
            id: user._id
        }, 'ILovePokemon');
        return res.json({
            user: user.username,
            token
        });

    }

}