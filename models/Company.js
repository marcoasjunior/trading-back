const mongoose = require('../database/mongoose')

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    corporateName: {
        type: String,
        require: true,

    },
    cnpj: {
        type: String,
        unique: true

    },
    cpf: {
        type: String,
        unique: true

    },
    location: {
        cep: String,
        address: String,
        address2: String
    },
    image: {
        type: String
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
}, {
    versionKey: false
})

const Company = mongoose.model('Company', CompanySchema)

module.exports = Company