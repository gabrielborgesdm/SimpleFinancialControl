const Mailer = require("../models/Mailer");
const mailer = new Mailer();

module.exports = {
  key: "ConfirmationEmail",
  options: {
    attempts: 3,
  },
  handle: async (data, done) => {
    let { name, email, country, token, url } = data;
    let subject =
      country === "brazil" ? "Confirme a sua conta" : "Confirm your account";
      mailer.setFrom(process.env.EMAIL_USER);
      mailer.setTo(email);
      mailer.setSubject(subject);
      mailer.setHtmlTemplate(`${country}ConfirmAccountTemplate`);
      mailer.setContext({ name, link: url + "/" + token });
      let info = await mailer.sendMessage(); 
      if(info.error){
        done(new Error('Error sending the confirmation e-mail:', info.message))
      } else {
        done()
      }
  },
};
