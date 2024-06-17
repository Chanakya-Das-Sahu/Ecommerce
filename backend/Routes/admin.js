const express = require('express');
const router = express.Router();
const Product = require('../Models/product');

router.post('/uploadProduct', async (req, res) => {
    try {
        // Extract data from request body
        const { name, image, dis, images, price, cat , qty } = req.body;

        // Create a new product instance
        const newProduct = new Product({
            name,
            image,
            dis,
            images,
            price,
            cat ,
            qty
        });

        // Save the new product to the database
        await newProduct.save();

        // Respond with success message and the saved product
        res.status(201).json({ msg: 'Product Uploaded Successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error uploading product:', error);
        res.status(500).json({ alert: 'Internal server error' });
    }
})

router.post('/updateProduct', async (req, res) => {
//  console.log(req.body)
    const { _id } = req.body 
   const charu = await Product.findByIdAndUpdate(
        _id,
        { $set: req.body },
        { new: true, runValidators: true }
    )   
    res.status(201).json({msg:'product details are updated'})
    // console.log(charu)
})

router.delete('/deleteProduct/:id', async (req,res)=>{
    const {id} = req.params 
    await Product.findByIdAndDelete(id)
    res.json({msg:'deleted'})
    })

module.exports = router;

    