const validate = require("./ValidateController")


let inputsArray = [
    ["userName", "string", "Gabriel Jota da ' \ ' silva !#@$$%¨$" ],
    ["userEmail", "email", "joao@jota.com" ],
    ["userPassword", "string", "@$SDAFSFSAF|D@#$@$" ],
]

let inputObject = validate.validateInputArray(inputsArray)
console.log(inputObject)