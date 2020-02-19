const Auth = require("../models/Auth")
const TokenController = require("./TokenController")
const ResponseBuilder = require("./ResponseBuilder")

const getAccount = async function(req, res){
    const response = new ResponseBuilder()
    const account = await Auth.getAccount({"_id": req.user._id})
    account.hash = undefined
    response.addParams({"user": account})
    return res.json(response.getParams())
}

const signIn = async function(req, res){
    const response = new ResponseBuilder()
    let userObject = await getUserObject(req)
    let account
    if (userObject.email){
        account = await Auth.getAccount({"email": userObject.email}) 
        if(!account) response.addError("account", "nonexistent", "Account does not exist")
    } else {
        response.addMultipleErrors(userObject)
    } 
    if(response.checkSuccess() && account) {
        checkPassword = await TokenController.verifyPassword(userObject.password, account.hash)
        const message = (checkPassword) ? "Authorization allowed" : "Authorization denied"
        const token = (checkPassword) ? TokenController.generateToken({"ip": getIp(req), "_id": account._id}) : undefined
        response.addParams({message, token})
    }
    return res.json(response.getParams())
}

const signUp = async function(req, res){
    const response = new ResponseBuilder()
    const userObject = await getUserObject(req)
    if(userObject.email){
        accountExists = await Auth.getAccount({"email": userObject.email})
        if (accountExists) response.addError("email", "unavailable", "Email is unavailable")
    } else {
        response.addMultipleErrors(userObject)
    }
    if(response.checkSuccess()) {
        userObject.hash = await TokenController.hashPassword(userObject.password)
        let account = await Auth.createUser(userObject)
        const message = (account) ? "Account created with success" : "It wasn't possible to create the account"
        const token = (account) ? TokenController.generateToken({"ip": getIp(req), "_id": account._id}) : ""
        response.addParams({message, token })
    }
    return res.json(response.getParams())
}

const getIp = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress

const getUserObject = async function(req) {
    const {name, email, password} = req.body
    let userObject =  Auth.validateAndBuildUserObject(name, email, password)
    return userObject
}

module.exports = {
    getAccount,
    signIn,
    signUp
}


