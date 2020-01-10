const User = require('../models/User')
const Company = require('../models/Company')
const jwt = require('jsonwebtoken')

module.exports = {

    create: (req, res) => {

        let user = new User({

            name: req.body.nameContact,
            username: req.body.username,
            contact: req.body.number,
            avatar: 'https://res.cloudinary.com/dxblalpv2/image/upload/v1578322291/avatar_f0uhiu.png'

        })

        User.register(user, req.body.password, function (err, user) {
            if (err) {
                console.log(err)
            }
        })

        console.log(user)
        Company.findOneAndUpdate({_id: req.user.company}, {$push: {users: user._id}})
 
            .exec(function (err, response) {
                if (err) return handleError(err);
                res.json(response)
            })

    },

    login: (req, res, next) => {

        let user = req.user

        Company.find({
            users: user._id
        }, function (err, docs) {

            if (err) {
                console.log(err)
            }

            // Token and paramethers

            const token = jwt.sign({
                    id: user._id,
                    company: docs[0]._id,
                    type: docs[0].type

                }, process.env.SUPERSECRET);


            return res.json({
                user: user.username,
                token
            })


        })

    },

    edit: (req, res, next) => {

        console.log(req.body)
        User.findByIdAndUpdate(req.body.id, {
                name: req.body.nameContact,
                username: req.body.username,
                contact: req.body.number,
        

            })
            .exec(function (err, response) {
                if (err) return handleError(err);
                res.status(200).send(response)
            })

    },

    delete: (req, res, next) => {

        console.log(req.body)
        User.findByIdAndRemove(req.body._id, (err, response) => {
            if (err) return handleError(err);
                res.status(200).send('Usuário deletado: ' + response )
        })

    }

    
}