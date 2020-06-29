const express = require('express')
const AuthController = require("./controllers/AuthController")
const TransactionController = require("./controllers/TransactionController")

const AuthenticationMiddleware = require("./middlewares/AuthenticationMiddleware")

const router = express.Router()

router.post('/accounts/signin', AuthController.signIn)
router.post('/accounts/signup', AuthController.signUp)
router.get('/accounts/confirmEmail/:token', AuthController.confirmEmail)
router.post('/accounts/passwordRecovery/', AuthController.passwordRecovery)

router.all("/*", AuthenticationMiddleware.authenticateToken)

router.get('/accounts/account', AuthController.getAccount)
router.post('/accounts/recoverPassword/', AuthController.recoverPassword)


router.get('/transaction', TransactionController.getTransactions)
router.get('/transaction/:id', TransactionController.getTransactions)
router.post('/transaction', TransactionController.postTransaction)
router.put('/transaction/:id', TransactionController.updateTransaction)
router.delete('/transaction/:id', TransactionController.deleteTransaction)

router.post('/transaction/download', TransactionController.downloadTransactions)



module.exports = router