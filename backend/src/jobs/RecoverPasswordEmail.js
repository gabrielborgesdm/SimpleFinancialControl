const Mailer = require("../models/Mailer");
const mailer = new Mailer();

module.exports = {
  key: "RecoverPasswordEmail",
  options: {
    attempts: 3,
  },
  handle: async (data, done) => {
  
    let { name, email, country, token, frontendRecoverURL } = data;
    let subject = country === "brazil" ? "Recupere a sua senha" : "Recover your password"
    mailer.setFrom(process.env.EMAIL_USER)
    mailer.setTo(email)
    mailer.setSubject(subject)
    mailer.setHtmlTemplate(`${country}recoverPasswordTemplate`)
    mailer.setContext({name, "link": `${frontendRecoverURL}/${token}`})
    let info = await mailer.sendMessage(); 
    if(info.error){
      done(new Error('Error sending the recover e-mail:', info.message))
    } else {
      done()
    }
  },
};
