const Mailer = require("../models/Mailer")
const mailer = new Mailer()

const sendEmailConfirmation = async (name, email, token, url) => {
    mailer.setFrom(process.env.EMAIL_USER)
    mailer.setTo(email)
    mailer.setSubject("Confirm your account.")
    mailer.setHtmlTemplate("confirmAccountTemplate")
    mailer.setContext({name, "link": url + "/accounts/confirmEmail/" + token})
    mailer.sendMessage()
}

module.exports = {
    sendEmailConfirmation
}
