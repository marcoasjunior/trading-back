const User = require('../models/User')

module.exports = {
    
    create: (req, res) => {
        console.log(req.body)
        
        let user = new User ({

            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            contact: req.body.password
        })

        User.register(user, req.body.password, function(err, user) {
            if (err) {
                console.log(err)
            }
            console.log(user)
        })

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
        






    }
}