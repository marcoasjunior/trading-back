const User = require('../models/User')

module.exports = {
    
    create: (req, res) => {
        console.log(req.body)
        
        let user = new User ({

            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            contact: req.body.password
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
    }
}