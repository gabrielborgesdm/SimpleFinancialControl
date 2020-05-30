const Mailer = require("../models/Mailer")
const mailer = new Mailer()

const sendEmailConfirmation = async (name, email, token, url) => {
    mailer.setFrom(process.env.EMAIL_USER)
    mailer.setTo(email)
    mailer.setSubject("Confirm your account.")
    mailer.setHtmlTemplate("confirmAccountTemplate")
    mailer.setContext({name, "link": url + "/" + token})
    let success = await mailer.sendMessage()
    return success
}

const sendRecoverPassword = async (name, email, token, frontendRecoverURL) => {
    mailer.setFrom(process.env.EMAIL_USER)
    mailer.setTo(email)
    mailer.setSubject("Recover your account.")
    mailer.setHtmlTemplate("recoverPasswordTemplate")
    mailer.setContext({name, "link": `${frontendRecoverURL}/${token}`})
    mailer.sendMessage()
    let success = await mailer.sendMessage()
    return success
}

module.exports = {
    sendEmailConfirmation,
    sendRecoverPassword
}
