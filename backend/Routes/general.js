const express = require('express')
const product = require('../Models/product')
const user = require('../Models/user');
const cart = require('../Models/cart')
const bcrypt = require('bcrypt')
const router = express.Router();
const jwt = require('jsonwebtoken')
const Auth = require('./Auth')
const nodemailer = require('nodemailer')

let OTP = '' ;
let time = 0 ;
router.post('/otpSending', async (req, res) => {
   const { email } = req.body
   // console.log('email',email)
   // console.log('otpsending')
   const userExists = await user.findOne({ email })
   // console.log('useExists',userExists)
   if (userExists) {
      res.json({ alert: 'user exists already' })
   } else {
      OTP = Math.floor(Math.random() * 1000000).toString();
      // OTP Sending :

      // time = Date.now() + 1000 * 60 * 10 ;
      time = Date.now() + 1000 * 30 ;
      console.log('OTP : ',OTP)
      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: 'ccccsahu@gmail.com',
            pass: process.env.PASS
         }
      });

      const mailOptions = {
         from: 'ccccsahu@gmail.com',
         to: email,
         subject: 'Chanakya Ecommerce OTP Verficiation : ',
         text: OTP
      };

      const response = await transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
            console.error(error);
         } else {
            console.log('Email sent: ' + info.response);
            res.json({msg:'otp sent'})
         }

      });

      // OTP Sending .
      
   }

})

router.post('/signup', async (req, res) => {
   const { email, password, otp } = req.body
     if(time>Date.now()){
     
   if (otp == OTP ) {
      const hashedPassword = await bcrypt.hash(password, 10)
      const createdUser = await user.create({ email, password: hashedPassword, address: '', mnumber: '', name: '' })
      if(true){
         res.json({ msg: 'user is created successfully' })
      }

   } else {
      res.json({ alert: 'OTP is inavalid' })
   }
}else{
   res.json({alert:'OTP is expired'})
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
         res.json({ alert: 'incorrect credentials' })
      }

   } else {
      res.json({ alert: 'incorrect credentials' })
   }


})

router.post('/getUserDetails', Auth, async (req, res) => {
   const { userId } = req.body
   const User = await user.findById(userId)
   if (User) {
      res.json({ msg: 'user found', User })
   } else {
      res.json({ alert: 'user not found' })
   }
})

router.put('/updateUserDetails', Auth, async (req, res) => {
   // console.log('req.body',req.body)
   const { _id, name, email, mnumber, address } = req.body
   // console.log("_id",_id)
   const User = await user.findById(_id)
   // console.log('charu User',User)
   const updatedUser = await user.findByIdAndUpdate(
      _id,
      { $set: { name, email, mnumber, address } },
      { new: true }
   )
   // console.log('updatedUser',updatedUser)
   if (updatedUser) {
      res.json({ msg: 'updated' })
   }

})

router.get('/getProduct/:id', async (req, res) => {
   const { id } = req.params;
   const getProduct = await product.findById(id)
   res.status(201).json(getProduct)
})

router.get('/getProducts', async (req, res) => {
   const products = await product.find();
   res.json({ msg: 'products', products })
})


router.post('/addToCart', Auth, async (req, res) => {
   const { userId, productId, qty } = req.body
   const cartFound = await cart.findOne({ userId })
   if (cartFound) {
      const productFound = cartFound.products.some(ele => ele.productId == productId)
      if (productFound) {
         res.json({ alert: 'this product is already in your cart' })
      } else {
         cartFound.products.push({ productId: productId, quantity: qty })
         await cartFound.save()
         res.json({ msg: 'item is added to cart successfully' })
      }
   } else {
      const createdCart = await cart.create({ userId: userId, products: [{ productId: productId, quantity: qty }] })
      res.json({ msg: 'cart has been created successfully' })
   }
})

router.post('/getCart', Auth, async (req, res) => {
   // console.log('getCart')
   const { userId } = req.body
   const Cart = await cart.findOne({ userId })
   // console.log('Cart',Cart)
   if (Cart) {
      const products = await Promise.all(
         Cart.products.map(async (ele) => {
            return await product.findById(ele.productId)
         })
      )
      // console.log('products',products)
      res.json({ products, quantities: Cart.products, msg: 'available' })
   } else {
      res.json({ alert: 'not available' })
   }
})

router.post('/checkProductInCart/:productId', Auth, async (req, res) => {
   
   const { productId } = req.params
   const { userId } = req.body
   // console.log('charu',productId,userId)
   const Cart = await cart.findOne({ userId })
   // console.log('Cart',Cart)
   if (Cart) {
      const Exists = Cart.products.some((product) => product.productId == productId)
      if (Exists) {
         // console.log('exists')
         res.json({ msg: 'exists' })
      } else {
         // console.log('not exist')
         res.json({ alert: 'not exist' })
      }
   }else{
      res.json({alert:'not exist'})
   }
})

router.post('/removeProductCart/:index', Auth, async (req, res) => {
   const { index } = req.params
   const { userId } = req.body
   const Cart = await cart.findOne({ userId })
   Cart.products.splice(index, 1)
   await Cart.save()
   res.json({ msg: 'item is removed from cart' })
})

router.post('/updateQuantityCart', Auth, async (req, res) => {
   const { userId, ind, qty } = req.body
   // console.log('userId,ind', userId, qty)
   const Cart = await cart.findOne({ userId })
   Cart.products[ind].quantity = qty
   await Cart.save()
   res.json({ msg: 'cart quantity has been updated successfully' })
})

router.post('/orderProduct', Auth, async (req, res) => {

   const { userId } = req.body
   const { address } = await user.findById(userId)
   if (address) {

   } else {
      res.json({ alert: 'complete your profile' })
   }

})

module.exports = router;