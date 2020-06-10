const Mailer = require("../models/Mailer")
const mailer = new Mailer()

const sendEmailConfirmation = async (name, email, country, token, url) => {
    let subject = country === "brazil" ? "Confirme a sua conta" : "Confirm your account"
    mailer.setFrom(process.env.EMAIL_USER)
    mailer.setTo(email)
    mailer.setSubject(subject)
    mailer.setHtmlTemplate(`${country}ConfirmAccountTemplate`)
    mailer.setContext({name, "link": url + "/" + token})
    let success = await mailer.sendMessage()
    return success
}

const sendRecoverPassword = async (name, email, country, token, frontendRecoverURL) => {
    let subject = country === "brazil" ? "Recupere a sua senha" : "Recover your password"

    mailer.setFrom(process.env.EMAIL_USER)
    mailer.setTo(email)
    mailer.setSubject(subject)
    mailer.setHtmlTemplate(`${country}recoverPasswordTemplate`)
    mailer.setContext({name, "link": `${frontendRecoverURL}/${token}`})
    mailer.sendMessage()
}

module.exports = {
    sendEmailConfirmation,
    sendRecoverPassword
}
