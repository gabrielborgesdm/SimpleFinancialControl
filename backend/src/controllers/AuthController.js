const Auth = require("../models/Auth")

const HashAndToken = require("./HashAndTokenController")
const MailerController = require("./MailerController")
const ResponseBuilder = require("./ResponseBuilder")

const getAccount = async function(req, res){
    const response = new ResponseBuilder()
    const account = await Auth.getAccount({"_id": req.user._id})
    account.hash = undefined
    if(account.isActive) {
        response.addParams({"user": account})
    } else {
        response.addError("account", "needs confirmation", "Your account needs to be confirmed")
    }
    
    return res.json(response.getParams())
}

const signIn = async function(req, res){
    const response = new ResponseBuilder()
    let userInput = await validateUserInput(req, response)
    let account = {}
    if (userInput.email){
        account = await Auth.getAccount({"email": userInput.email}) 
        if(!account) response.addError("account", "nonexistent", "Account does not exist")
    } else {
        response.addMultipleErrors(userInput)
    } 
    await login(account, userInput, req, response)
    return res.json(response.getParams())
}

const login = async (account, userInput, req, response) =>{
    if(response.checkSuccess()) {
        if(account.isActive){
            checkPassword = await HashAndToken.verifyPassword(userInput.password, account.hash)
            const message = (checkPassword) ? "Authorization allowed" : "Authorization denied"
            const token = (checkPassword) ? HashAndToken.generateToken({"ip": HashAndToken.getIp(req), "_id": account._id}) : undefined
            response.addParams({message, token})
        } else{
            response.addError("account", "needs confirmation", "Your account needs to be confirmed")
        }  
    } 
}

const signUp = async function(req, res){
    const response = new ResponseBuilder()
    let userInput = await validateUserInput(req, response)
    if(userInput.email){
        let accountExists = await Auth.getAccount({"email": userInput.email})
        if (accountExists) response.addError("email", "unavailable", "Email is unavailable")
    } else {
        response.addMultipleErrors(userInput)
        userInput = false
    }
    let account = (response.checkSuccess()) ? await createAccount(userInput, response) : false
    if (response.checkSuccess()) sendEmailConfirmation(account, req.get("host"))
    return res.json(response.getParams())
}

const validateUserInput = async (req, response) => {
    const {name, email, password} = req.body
    let userInput =  Auth.validateAndBuildUserObject(name, email, password)
    return userInput
}

const createAccount = async (userInput, response) =>{
    userInput.hash = await HashAndToken.hashPassword(userInput.password)
    let account = await Auth.createUser(userInput)
    const message = (account) ? "Account created" : "Coudn't create account"
    response.addParams({message})
    return account
}

const sendEmailConfirmation = (account, url) => {
    const token = HashAndToken.generateToken({"_id": account._id})
    MailerController.sendEmailConfirmation(account.name, account.email, token, url)
}

const confirmEmail = async (req, res) => {
    const _id = await HashAndToken.decodeEmailToken(req.params.token)
    const accountConfirmed = await Auth.confirmAccount(_id)
    res.json({accountConfirmed})
}

module.exports = {
    getAccount,
    signIn,
    signUp,
    confirmEmail
}


