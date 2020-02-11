const express = require('express')

const AuthController = require("./controllers/AuthController")
const router = express.Router()

router.post('/accounts/signIn', AuthController.signIn)
router.post('/accounts/signUp', AuthController.signUp)

module.exports = router