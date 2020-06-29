## Api Rest Backend ##

### Features ###
- [x] API REST developed to be used with both the web and mobile applications.
- [x] Using [Mongo DB](https://www.mongodb.com/) and [Mongoose](https://mongoosejs.com/) in order to store the application related data.
- [x] Using [Redis](https://redis.io/) to store jobs and other server processing related issues.
- [x] It uses [Bcrypt](https://www.npmjs.com/package/bcrypt) in order to hash the user's password and [JSON Web Tokens](https://jwt.io/) in order to authorizate access to the dashboard panel.
- [x] [Nodemailer](https://nodemailer.com/about/) to deliver account related E-mails.
- [x] Simple Financial Controls e-mails have both Portuguese and English versions.
- [x] [Bull Queue Jobs](https://github.com/OptimalBits/bull) running in a separated server and integrated with Nodemailer to avoid the risk of losing any e-mails or any future implemented processes that can eventually fail.
- [ ] Anti-Bruteforce system. 

### Instalation ###
1. Rename .env-example to .env. Then enter your configuration.
2. In case you want to use a mail service different from Gmail, you can change the nodemailer config in the file src/configs/mail.js
3. Run `npm init` to initiate the project
4. Run `npm install` to install all the packages
5. Run `npm run dev` to run both apps and jobs servers
