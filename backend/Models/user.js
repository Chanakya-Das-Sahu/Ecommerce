const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    mnumber: {
        type: String
    },
    name:{
        type:String
    }
})

module.exports = model('euser', userSchema)