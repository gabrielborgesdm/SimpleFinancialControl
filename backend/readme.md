## Api Rest Backend ##
It uses [Bcrypt](https://www.npmjs.com/package/bcrypt) in order to hash the user's password and [JSON Web Tokens](https://jwt.io/) in order to authorizate access to the dashboard panel.

### Instalation ###
1. Rename .env-example to .env then fill it with your config
1.1 In case you want to use a mail service different from Gmail, you can change the nodemailer config in the file src/configs/mail.js
2. Run `npm init` to initiate the project
3. Run `npm install` to install all the packages
4. Run `npm run dev` to run the server
