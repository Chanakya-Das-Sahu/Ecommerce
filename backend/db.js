const mongoose = require('mongoose');
require('dotenv').config({path:'./.env'})
const mongoURI = process.env.MONGO_URI
const connectToMongo = () =>{
    mongoose.connect(mongoURI)
    .then(()=>{console.log('connected')}) //??
    .catch((err)=>{console.log(`not connected due to err : ${err}`)})
}

module.exports  = connectToMongo ;