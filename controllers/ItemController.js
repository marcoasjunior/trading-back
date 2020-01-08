const Company = require('../models/Company')
const Item = require('../models/Item')

module.exports = {
    create: (req, res, next) => {

        let item = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        })

        item.save()
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                handleError(err)
            })

        let user = req.user

        Company.findOneAndUpdate({
                _id: user.company
            }, {
                $push: {
                    deposit: item._id
                }
            })

            .exec(function (err, response) {
                if (err) return handleError(err);
                res.json(response)
            })

    },

    edit: (req, res, next) => {

        Item.findByIdAndUpdate(req.body.id, {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category
        

            })
            .exec(function (err, response) {
                if (err) return handleError(err);
                res.status(200).send('Item alterado')
            })

    },

}