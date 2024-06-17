const express = require('express')
const product = require('../Models/product')
const router = express.Router();

router.get('/getProduct/:id',async(req,res)=>{
    const {id} = req.params ;
   const getProduct = await product.findById(id) 
   // const getProduct = await product.find()
   res.status(201).json(getProduct)
 })

router.get('/getProducts',async(req,res)=>{
   const products = await product.find();
   // console.log(products)s
   res.json({msg:'products',products})
})

module.exports = router ;