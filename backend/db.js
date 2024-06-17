const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://ccccsahu:Charu%40281971@cluster0.wnomgof.mongodb.net/mernStackProject?retryWrites=true&w=majority'
const connectToMongo = () =>{
    mongoose.connect(mongoURI)
    .then(()=>{console.log('connected')})
    .catch((err)=>{console.log(`not connected due to err : ${err}`)})
}

module.exports  = connectToMongo ;