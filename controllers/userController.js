const User = require('../models/User')
const passport = require('passport')

module.exports = {
    
    create: (req, res) => {
        console.log(req.body)
        
        let user = new User ({

            name: req.body.nameContact,
            username: req.body.username,
            contact: req.body.number,

        })

        User.register(user, req.body.password, function(err, user) {
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

    login: (req, res) => {

        User.findOne({
            username: req.body.username
        }, (err, person) => {
            console.log(req.user)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                success: true,
                status: 'Logged in!'
    
            });
        })
        





    }
    
}