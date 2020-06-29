const nodemailer = require("nodemailer")
const mailConfig = require("../configs/mail")
const path = require("path")
const hbs = require("nodemailer-express-handlebars")

class Mailer {
    constructor () {
        let transport = nodemailer.createTransport(mailConfig)

        let hbsData = {
            viewEngine: {
                extName: '.handlebars',
                partialsDir: path.join(__dirname, '../views/emailTemplate'),
                layoutsDir: path.join(__dirname, '../views/emailTemplate'),
                defaultLayout: null
            },
            viewPath: path.join(__dirname, "../views/emailTemplate")
        }

        transport.use("compile", hbs(hbsData))
        this.transport = transport
    }

    setFrom = (from) => this.from = from
    setTo = (to) => this.to = to
    setSubject = (subject) => this.subject = subject
    setText = (text) => this.text = text
    setHtmlTemplate = (htmlTemplate) => this.htmlTemplate = htmlTemplate 
    setContext = (context) => this.context = context


    async sendMessage() {
        let info
        try {
            info = await this.transport.sendMail({
                from: this.from,
                to: this.to,
                subject: this.subject,
                text: this.text,
                template: this.htmlTemplate,
                context: this.context
            }) 
        } catch (error) {
            console.log(error)
            info = false
        }
        return info
    }

}

module.exports = Mailer
