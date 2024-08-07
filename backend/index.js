const express = require('express')
const app = express()
const cors = require('cors')
const connectToMongo = require('./db.js')
const general = require('./Routes/general')
app.use(cors())
app.use(express.json())
connectToMongo()
console.log('charu')

app.use('/api/general',general)

app.listen(3000,()=>{
    console.log('listening  on  the s port 3000')
})

