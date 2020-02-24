# Simple Financial Control #
It's a financial application that helps you to deal with your finances. It is divided in three main folders: backend, webApp and mobileApp. The backend is a Rest API made with Node.js and both Web and Mobile applications were respectively developed using React and React Native.

## Api Rest Backend ##
It uses [Bcrypt](https://www.npmjs.com/package/bcrypt) in order to hash the user's password and [JSON Web Tokens](https://jwt.io/) in order to authorizate access to the dashboard panel.

### Instalation ###
1. Create a .env file into the backend directory, then and add the next paramters:
```
ACCESS_TOKEN_SECRET=[jwt signature]
DATABASE_ACCESS_LINK=[mongo Db Link]
PORT=[port] //Whatever port you want, it could be 8000, for an example
EMAIL_HOST=[E-mail service host]
EMAIL_PORT=[E-mail service port]
EMAIL_USER=[E-mail service user]
EMAIL_PASSWORD=[E-mail service password]

```
2. Run `npm init` to initiate the project
3. Run `npm install` to install all the packages
4. Run `npm start` to start the server
