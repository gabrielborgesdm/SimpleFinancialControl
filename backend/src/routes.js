const express = require('express')
const AuthController = require("./controllers/AuthController")
const TokenController = require("./controllers/TokenController")

const router = express.Router()

router.all(["/accounts/account"], TokenController.authenticateToken)
router.post('/accounts/signin', AuthController.signIn)
router.post('/accounts/signup', AuthController.signUp)
router.get('/accounts/account', AuthController.getAccount)

module.exports = router