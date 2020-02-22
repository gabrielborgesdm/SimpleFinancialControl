const express = require('express')
const AuthController = require("./controllers/AuthController")
const HashAndTokenController = require("./controllers/HashAndTokenController")

const router = express.Router()

router.all(["/accounts/account"], HashAndTokenController.authenticateToken)
router.post('/accounts/signin', AuthController.signIn)
router.post('/accounts/signup', AuthController.signUp)
router.get('/accounts/confirmEmail/:token', AuthController.confirmEmail)
router.get('/accounts/account', AuthController.getAccount)

module.exports = router