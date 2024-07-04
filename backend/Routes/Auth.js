const jwt = require('jsonwebtoken')
const user = require('../Models/user')
require('dotenv').config({path:'../.env'})
const jwtKey = process.env.JWT_KEY
const Auth = (req,res,next) =>{
     // console.log('req.headers.Authorization',req.headers.authorization)
     if(req.headers.authorization!='' ){
          console.log('')
          console.log('auth req.header.auth',req.headers.authorization)
     const User = jwt.verify(req.headers.authorization,jwtKey)
     if(User){
          const checkUser = async  () =>{
            const userFound = await user.findById(User.userId)
            if(userFound){
             req.body.userId = User.userId 
                next()
            }
          }
     checkUser()
     }
}
}

module.exports = Auth 