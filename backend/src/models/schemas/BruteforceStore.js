var ExpressBrute = require('express-brute')
var MongoStore = require('express-brute-mongo')
var MongoClient = require('mongodb').MongoClient

let link = process.env.DATABASE_ACCESS_LINK

let hasError = false

var store = new MongoStore(function (ready) {
  MongoClient.connect(link, { useUnifiedTopology: true }, function(err, client) {
    let db = client.db("BruteforceStore")
    if (err) {
        hasError = true
        throw err
    }
    ready(db.collection('bruteforce-store'))
    //client.close()
  })
})

var bruteforce = new ExpressBrute(store)
if(hasError) bruteforce = null

module.exports = bruteforce