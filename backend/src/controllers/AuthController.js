const Auth = require("../models/Auth")

const HashAndToken = require("./HashAndTokenController")
const MailerController = require("./MailerController")
const ResponseBuilder = require("./ResponseBuilder")

const getAccount = async function(req, res){
    const response = new ResponseBuilder()
    const account = await Auth.getAccount({"_id": req.user._id})
    if(account){
        if(account.isActive) {
            account.hash = undefined
            response.addParams({"user": account})
        } else {
            response.addError("account", "needs confirmation", "Your account needs to be confirmed")
        }
    } else{
        response.addError("account", "nonexistent", "Account does not exist")
    }
    return res.json(response.getParams())
}

const signIn = async function(req, res){
    const response = new ResponseBuilder()
    const {name, email, password} = req.body
    let userInput = await validateUserInput({name, email, password})
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
    const {name, email, password} = req.body
    let userInput = await validateUserInput({name, email, password})
    if(userInput.email){
        let accountExists = await Auth.getAccount({"email": userInput.email})
        if (accountExists) response.addError("email", "unavailable", "Email is unavailable")
    } else {
        response.addMultipleErrors(userInput)
        userInput = false
    }
    let account = (response.checkSuccess()) ? await createAccount(userInput, response) : false
    if (response.checkSuccess()) sendEmailConfirmation(account, req.get("host"), HashAndToken.getIp(req))
    return res.json(response.getParams())
}

const validateUserInput = async (inputObject, response) => {
    inputObject =  await Auth.validateAndBuildUserObject(inputObject)
    return inputObject
}

const createAccount = async (userInput, response) =>{
    userInput.hash = await HashAndToken.hashPassword(userInput.password)
    let account = await Auth.createUser(userInput)
    const message = (account) ? "Account created" : "Coudn't create account"
    response.addParams({message})
    return account
}

const sendEmailConfirmation = (account, url, ip) => {
    const token = HashAndToken.generateToken({"ip": ip, "_id": account._id})
    MailerController.sendEmailConfirmation(account.name, account.email, token, url)
}

const confirmEmail = async (req, res) => {
    const _id = await HashAndToken.verifyToken(req.params.token, HashAndToken.getIp(req))
    const accountConfirmed = await Auth.confirmAccount(_id)
    res.json({accountConfirmed})
}

const passwordRecovery = async (req, res) =>  {
    const response = new ResponseBuilder()
    let account
    const ip = HashAndToken.getIp(req)
    let {email, frontendRecoverURL} = req.body
    let inputObject = await validateUserInput({email, frontendRecoverURL})
    if(!inputObject.email) {
        response.addMultipleErrors(inputObject)
    } else{
        email = inputObject.email
        frontendRecoverURL = inputObject.frontendRecoverURL
    }
    if(response.checkSuccess()){
        account = await Auth.getAccount({email})
        if(!account) response.addError("account", "nonexistent", "Account does not exist")
    }
    if(response.checkSuccess()){
        const token = HashAndToken.generateToken({"ip": ip, "_id": account._id})
        MailerController.sendRecoverPassword(account.name, email, token, frontendRecoverURL)
        response.addParams({"message": "Access your e-mail to recover your password"})
        
    }
    res.json(response.getParams())
}

const recoverPassword = async (req, res) =>  {   
    const response = new ResponseBuilder()
    let password = req.body.password
    const _id = req.user._id
    
    let updateAccount
    userInput = await validateUserInput({password})
    if(!userInput.password) {
        response.addMultipleErrors(userInput)
        console.log("teste")
    } else{
        password = userInput.password
    }
    if(response.checkSuccess()){
        let hash = await HashAndToken.hashPassword(password)
        updateAccount = await Auth.updateAccount(_id, {hash})
    }
    if(updateAccount){
        response.addParams({"message": "Account updated with success"})
    } else {
        response.addError("account", "couldn't update", "It wasn't possible to update your account")
    }
        
    return res.json(response.getParams())
}

module.exports = {
    getAccount,
    signIn,
    signUp,
    confirmEmail,
    passwordRecovery,
    recoverPassword,
}


