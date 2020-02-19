# DashboardApp #
It's an online dashboard application divided in three directories: backend, webApp and mobileApp. The backend is a Rest API made with Node.js and both Web and Mobile applications were respectively developed using React and React Native.

## Api Rest Backend ##
It uses [Bcrypt](https://www.npmjs.com/package/bcrypt) in order to hash the user's password and [JSON Web Tokens](https://jwt.io/) in order to authorizate access to the dashboard panel.

### Instalation ###
1. Create a .env file ìnto the backend directory, then and add the next paramters:
```
ACCESS_TOKEN_SECRET=[jwt signature]
DATABASE_ACCESS_LINK=[mongo Db Link]
PORT=[port] //Whatever port you want, it could be 8000, for an example
```
2. Run `npm init` to install all the packages
3. Run `npm start` to init the server
