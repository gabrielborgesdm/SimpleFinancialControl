const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
class Mailer {
    constructor () {
        let transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            tls: {
                ciphers:'SSLv3'
             },
            auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASSWORD
            }
        })

        transport.use("compile", hbs({
            viewEngine: {
                extName: '.handlebars',
                partialsDir: 'src/views/emailTemplate/',
                layoutsDir: 'src/views/emailTemplate/',
                defaultLayout: "confirmAccountTemplate.handlebars"
            },
            viewPath: "src/views/emailTemplate/"
        }))
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
            info = false
        }
        return info
    }

}

module.exports = Mailer
