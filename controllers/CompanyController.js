const Company = require('../models/Company')
const User = require('../models/User')

module.exports = {

    async create(req, res) {

        let file = req.file
        let company = null
        let user = new User({

            name: req.body.nameContact,
            username: req.body.username,
            contact: req.body.number,
            avatar: 'https://res.cloudinary.com/dxblalpv2/image/upload/v1578322291/avatar_f0uhiu.png'
        })

        company = new Company({
            name: req.body.name,
            corporateName: req.body.social,
            cnpj: req.body.cnpj,
            cpf: req.body.cpf,
            simples: req.body.simples,
            location: {
                cep: req.body.cep,
                address: req.body.address,
                address2: req.body.address2
            },
            image: file.secure_url,
            users: user._id,
            type: req.body.type
        })

        // sending do Mongo

        await User.register(user, req.body.password, function (err, user) {
            if (err) {
                console.log(err)
            }
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
                })
            })
    },

    async createDocs(req, res) {

        const company = req.user.company

        for await (let doc of req.files) {

            await Company.findOneAndUpdate({
                _id: company
            }, {
                $push: {
                    docs: {
                        name: doc.originalname,
                        file: doc.secure_url
                    }
                }
            }).catch(err => res.send(err))
        }

        res.status(200).json('')

    },

    getUsers: (req, res, next) => {

        let user = req.user

        Company.findById(user.company)
            .populate('users')
            .exec(function (err, response) {
                if (err) return handleError(err);
                res.json(response.users)
            })

    },

    getItems: async (req, res, next) => {

        let user = req.user



        await Company.findById(user.company)
            .populate('deposit')
            .exec(function (err, response) {
                if (err) return handleError(err)
                let items = []

                response.deposit.forEach(item => {

                    items.push({
                        _id: item._id,
                        name: item.name,
                        description: item.description,
                        price: parseFloat(item.price),
                        category: item.category
                    })

                })

                res.json(items)

            })




    }
}