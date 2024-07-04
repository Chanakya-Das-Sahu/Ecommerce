const { Schema , model } = require('mongoose')

const IQschema = new Schema({
    productId:{
        type:String
    },
    quantity:{
        type:String
    }
})

const cartSchema = new Schema({
   userId:{
    type:String
   },
   products:{
    type:[IQschema]
   }
})

module.exports = model('cart',cartSchema)