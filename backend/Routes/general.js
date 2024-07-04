const express = require('express')
const product = require('../Models/product')
const user = require('../Models/user');
const cart = require('../Models/cart')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken')
const Auth = require('./Auth')
router.post('/signup', async (req, res) => {
   const { email, password } = req.body
   const userExists = await user.findOne({ email })
   if (userExists) {
      res.json({ alert: 'user exists already' })
   }
   const hashedPassword = await bcrypt.hash(password, 10)
   const createdUser = await user.create({ email, password: hashedPassword })
   if (createdUser) {
      res.json({ msg: 'user created successfully' })
   }
})

router.post('/login', async (req, res) => {
   const { email, password } = req.body
   const User = await user.findOne({ email })
   if (User) {
      const isPasswordCorrect = await bcrypt.compare(password, User.password)
      if (isPasswordCorrect) {
         const token = jwt.sign({ userId: User._id }, 'chanakya', { expiresIn: '1d' })
         res.json({ token: token, msg: 'login is successfull' })
      } else {
         res.json({ alert: 'incorrect credential' })
      }

   } else {
      res.json({ alert: 'incorrect credentials' })
   }


})

router.get('/getProduct/:id', async (req, res) => {
   const { id } = req.params;
   const getProduct = await product.findById(id)
   // const getProduct = await product.find()
   res.status(201).json(getProduct)
})

router.get('/getProducts', async (req, res) => {
   const products = await product.find();
   res.json({ msg: 'products', products })
})


router.post('/addToCart', async (req, res) => {
   const { userId, productId, qty } = req.body
   const cartFound = await cart.findOne({ userId })
   if (cartFound) {
      const productFound = cartFound.products.some(ele => ele.productId == productId)
      if (productFound) {
         res.json({ alert: 'this product is already in your cart' })
      } else {
         cartFound.products.push({ productId: productId, quantity: qty })
         await cartFound.save()
         res.json({msg:'item is added to cart successfully'})
      }
   } else {
      const createdCart = await cart.create({ userId: userId, products: [{ productId: productId, quantity: qty }] })
      res.json({ msg: 'cart has been created successfully' })
   }
})

router.post('/getCart',Auth,async(req,res)=>{
   const{userId} = req.body 
   const Cart = await cart.findOne({userId})
   // console.log('Cart',Cart)
   const products = await Promise.all(
      Cart.products.map(async (ele)=>{
         return await product.findById(ele.productId)
      })
   )
   // console.log('products',products)
   res.json({products,quantities:Cart.products,msg:'successful'})
})

router.post('/removeProductCart/:index',Auth,async(req,res)=>{
   const {index} = req.params 
   const {userId} = req.body 
   const Cart = await cart.findOne({userId})
   Cart.products.splice(index,1)
   await Cart.save()
   res.json({msg:'item is removed from cart'})
 })

 router.post('/updateQuantityCart',Auth,async(req,res)=>{
   const {userId,ind,qty} = req.body
   console.log('userId,ind',userId,qty)
   const Cart = await cart.findOne({userId})
   Cart.products[ind].quantity = qty 
   await Cart.save()
   res.json({msg:'cart quantity has been updated successfully'})
 })

module.exports = router;