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
     
    },
    cpf: {
        type: String,
   
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true,
    versionKey: false
})

const Company = mongoose.model('Company', CompanySchema, 'companies')

module.exports = Company