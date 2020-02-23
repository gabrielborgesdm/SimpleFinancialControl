const express = require('express')
const AuthController = require("./controllers/AuthController")
const HashAndTokenController = require("./controllers/HashAndTokenController")

const router = express.Router()

router.all(["/accounts/account", "/accounts/recoverPassword"], HashAndTokenController.authenticateToken)

router.post('/accounts/signin', AuthController.signIn)
router.post('/accounts/signup', AuthController.signUp)

router.get('/accounts/confirmEmail/:token', AuthController.confirmEmail)
router.post('/accounts/passwordRecovery/', AuthController.passwordRecovery)//email and frontend link
router.post('/accounts/recoverPassword/', AuthController.recoverPassword)//new password

router.get('/accounts/account', AuthController.getAccount)

module.exports = router