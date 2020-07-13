const express = require('express')
const AuthController = require("./controllers/AuthController")
const TransactionController = require("./controllers/TransactionController")

const AuthenticationMiddleware = require("./middlewares/AuthenticationMiddleware")

const router = express.Router()
const baseURL = ""

router.post(`${baseURL}/accounts/signin`, AuthController.signIn)
router.post(`${baseURL}/accounts/signup`, AuthController.signUp)
router.get(`${baseURL}/accounts/confirmEmail/:token`, AuthController.confirmEmail)
router.post(`${baseURL}/accounts/passwordRecovery/`, AuthController.passwordRecovery)

router.all("/*", AuthenticationMiddleware.authenticateToken)

router.get(`${baseURL}/accounts/account`, AuthController.getAccount)
router.post(`${baseURL}/accounts/recoverPassword/`, AuthController.recoverPassword)


router.get(`${baseURL}/transaction`, TransactionController.getTransactions)
router.get(`${baseURL}/transaction/:id`, TransactionController.getTransactions)
router.post(`${baseURL}/transaction`, TransactionController.postTransaction)
router.put(`${baseURL}/transaction/:id`, TransactionController.updateTransaction)
router.delete(`${baseURL}/transaction/:id`, TransactionController.deleteTransaction)

router.post(`${baseURL}/transaction/download`, TransactionController.downloadTransactions)



module.exports = router
