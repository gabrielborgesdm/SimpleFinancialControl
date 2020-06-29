require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
//const Bullboard = require('bull-board')
const Queue = require("./lib/Queue")
const cors = require('cors')

const routes = require('./routes')

const app = express()

/* Bullboard.setQueues(Queue.queues.map(queue=>queue.bull))
app.use('/admin/queues', Bullboard.UI) */

let connectionError = false
let link = process.env.DATABASE_ACCESS_LINK
let port = process.env.PORT || 8080
if(!link) throw "Mongo Database acccess link is empty, create an .env file and inform it as DATABASE_ACCESS_LINK=[link]"
mongoose.connect(link, 
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
    app.listen(port)
    console.log("Server started on port", process.env.PORT)
}


