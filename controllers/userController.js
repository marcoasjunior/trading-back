const User = require('../models/User')
const passport = require('passport')

module.exports = {
    
    create: (req, res) => {
        console.log(req.body)
        
        let user = new User ({

            name: req.body.nameContact,
            username: req.body.username,
            email: req.body.email,
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

    login: () => { 
      

       passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login'
        })}
    
}