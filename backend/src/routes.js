const express = require('express')
const AuthController = require("./controllers/AuthController")
const TransactionController = require("./controllers/TransactionController")
const HashAndTokenController = require("./controllers/HashAndTokenController")

var ExpressBrute = require('express-brute')
var bruteforce = require("./models/schemas/BruteforceStore")

const router = express.Router()

router.post('/accounts/signin', bruteforce.prevent, AuthController.signIn)
router.post('/accounts/signup', bruteforce.prevent, AuthController.signUp)
router.get('/accounts/confirmEmail/:token', bruteforce.prevent, AuthController.confirmEmail)
router.post('/accounts/passwordRecovery/', bruteforce.prevent, AuthController.passwordRecovery)

router.all("/*", HashAndTokenController.authenticateToken)

router.get('/accounts/account', AuthController.getAccount)
router.post('/accounts/recoverPassword/', AuthController.recoverPassword)


router.get('/transaction', TransactionController.getTransactions)
router.get('/transaction/:id', TransactionController.getTransactions)
router.post('/transaction', TransactionController.postTransaction)
router.put('/transaction/:id', TransactionController.updateTransaction)
router.delete('/transaction/:id', TransactionController.deleteTransaction)

router.post('/transaction/download', TransactionController.downloadTransactions)



module.exports = router