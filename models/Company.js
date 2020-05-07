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
    simples: {
        type: Boolean,
   
    },
    location: {
        cep: String,
        address: String,
        address2: String
    },
    image: {
        type: String
    },
    type: {
        type: String
    },
    deposit: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    docs: [{
        name: String,
        file: String
    }]
}, {
    timestamps: true,
    versionKey: false
})

const Company = mongoose.model('Company', CompanySchema, 'companies')

module.exports = Company