require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./src/routes')

const app = express()

mongoose.connect('', 
{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(3334)