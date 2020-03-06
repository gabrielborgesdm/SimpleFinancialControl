const express = require('express')
const AuthController = require("./controllers/AuthController")
const TransactionController = require("./controllers/TransactionController")
const HashAndTokenController = require("./controllers/HashAndTokenController")

const router = express.Router()

router.post('/accounts/signin', AuthController.signIn)
router.post('/accounts/signup', AuthController.signUp)
router.get('/accounts/confirmEmail/:token', AuthController.confirmEmail)
router.post('/accounts/passwordRecovery/', AuthController.passwordRecovery)

router.all("/*", HashAndTokenController.authenticateToken)

router.get('/accounts/account', AuthController.getAccount)
router.post('/accounts/recoverPassword/', AuthController.recoverPassword)


router.get('/transactions', TransactionController.getTransactions)
router.post('/transactions', TransactionController.postTransaction)
router.put('/transactions/:id', TransactionController.updateTransaction)
router.delete('/transactions/:id', TransactionController.deleteTransaction)



module.exports = router