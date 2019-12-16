const Company = require('../models/Company')
const User = require('../models/User')
const mongoose = require('mongoose')
const fs = require('fs')
const multer = require('multer')
const storage = require('../util/multer')
const upload = multer({
    storage: storage
})
const cloudinary = require('cloudinary').v2
const cloudConfig = require('../util/cloudinary')
const uniqueFilename = new Date().toISOString()

module.exports = {

    create: (req, res) => {

        // SEND FILE TO CLOUDINARY
        
        cloudConfig()

        let company = null
        let user = null

        
        cloudinary.uploader.upload(req.file.path, {
            public_id: `users/${uniqueFilename}`
        })

        cloudinary.uploader.upload(req.file.path, {
                secure: true,
                public_id: `users/${uniqueFilename}`

            },

            function (err, image) {

                if (err) res.send(err)

                console.log('file uploaded to Cloudinary')

                // remove file from server

                fs.unlinkSync(req.file.path)

                // return image details

                const replaced = image.url.replace(/http/i, 'https')

                // creating documents

                user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.nameContact,
                    email: req.body.email,
                    password: req.body.password,
                    contact: req.body.number
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
                    image: replaced,
                    users: user._id
                })

                // sending do Mongo

                user.save((function (err) {
                    if (err) return handleError(err)
                }))
    
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
              
            })


    }
}