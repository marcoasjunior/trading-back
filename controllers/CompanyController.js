const Company = require('../models/User')
const User = require('../models/User')

module.exports = {

    create: (req, res) => {
        console.log(req.body)

        let user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            contact: req.body.contact
        })

        user.save((function (err) {
            if (err) return handleError(err)
        }))

        const company = req.body.cpf ?

            new Company({
                name: req.body.name,
                corporateName: req.body.corporateName,
                cnpj: req.body.cnpj,
                location: {
                    cep: req.body.cep,
                    address: req.body.address,
                    address2: req.body.address2
                },
                image: req.body.image,
                users: user._id
            })

            :
            new Company({
                name: req.body.name,
                corporateName: req.body.corporateName,
                cpf: req.body.cpf,
                location: {
                    cep: req.body.cep,
                    address: req.body.address,
                    address2: req.body.address2
                },
                image: req.body.image,
                users: user._id
            })

        company.save((function (err) {
            if (err) return handleError(err)
        }))

    }
}