const Company = require('../models/Company')
const User = require('../models/User')
const mongoose = require('mongoose')

module.exports = {

    create: (req, res) => {

        let user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.nameU,
            email: req.body.email,
            password: req.body.password,
            contact: req.body.contact
        })

        user.save((function (err) {
            if (err) return handleError(err)
        }))


        let company = new Company({
            name: req.body.nameC,
            corporateName: req.body.corporateName,
            cnpj: req.body.cnpj,
            cpf: req.body.cpf,
            simples: req.body.simples,
            location: {
                cep: req.body.cep,
                address: req.body.address,
                address2: req.body.address2
            },
            image: req.body.image,
            users: user._id
        })

        company.save()
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