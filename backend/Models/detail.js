const {Schema,model} = require('mongoose')

const detailSchema = new Schema({
    name:{
        type:String
    },
    mnumber:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports = model('details',detailSchema)