# Simple Financial Control #
Simple Financial Control is an application that helps you to have control of your incomes and expenses. it has an API Rest Server developed with Node and Express. In order to develop a responsive web application I used React and Bootstrap. Finally, for Database I chose Mongo.

# Features #

## Api Rest Backend ##

- [x] API REST developed to be used with both the web and mobile applications.
- [x] Using [Mongo DB](https://www.mongodb.com/) and [Mongoose](https://mongoosejs.com/) in order to store the application related data.
- [x] Using [Redis](https://redis.io/) to store jobs and other server processing related issues.
- [x] It uses [Bcrypt](https://www.npmjs.com/package/bcrypt) in order to hash the user's password and [JSON Web Tokens](https://jwt.io/) in order to authorizate access to the dashboard panel.
- [x] [Nodemailer](https://nodemailer.com/about/) to deliver account related E-mails.
- [x] Simple Financial Controls e-mails have both Portuguese and English versions.
- [x] [Bull Queue Jobs](https://github.com/OptimalBits/bull) running in a separated server and integrated with Nodemailer to avoid the risk of losing any e-mails or any future implemented processes that can eventually fail.

## React Front-end ##

- [x] Responsive React application that works with an API Rest in the Backend.
- [x] Translation System based on user web browser's language.
- [x] Date and Monetary system changes according user's account country config.
- [x] Dynamic Generated and Responsive [Charts](https://www.chartjs.org/) that changes according user's date filter.
- [x] Besides the general Transactions View, there is a detailed transactions page, where you can sort, filter and download them as you wish.
- [x] Transactions can be exported to CSV, XLS and JSON formats.
- [x] Password Security Risk Component implemented.

# Instalation #

Each folder has its instalation's instructions inside their README.md file.

# Screenshots #

## API ##

##### Signing up using the API #####
![api-signup](/screenshots/api-signup.png)

##### Errors when the API doesn't receive propper input #####
![api-signup-error](/screenshots/api-signup-error.png)


## Website ##

##### Adding a transaction #####
![frontend-transaction-add](/screenshots/addTransaction.png)

##### Transactions #####
![frontend-transaction-add](/screenshots/home.png)

##### Transactions Details #####
![frontend-transaction-add](/screenshots/details.png)
