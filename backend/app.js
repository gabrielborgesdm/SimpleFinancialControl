require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./src/routes')

const app = express()
let connectionError = false
mongoose.connect(process.env.DATABASE_ACCESS_LINK, 
{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch(error => {
    console.log(`[MongoDB] Failed to connect with the server: ${error}`)
    connectionError = true
})
if(!connectionError){
    app.use(cors())
    app.use(express.static(__dirname))
    app.use(express.json())
    app.use(routes)
    app.listen(process.env.PORT)
    console.log("Server started on Port", process.env.PORT)
}


