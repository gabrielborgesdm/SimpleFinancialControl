const Validate = require("../models/Validate")

module.exports = {
    async validateInputArray (inputArray){
        let inputObject = {}
        let fieldObject = {}
        let value 
        let validate = new Validate()
        for (input of inputArray) {
            let fieldName = input[0]
            let fieldType = input[1]
            let fieldValue = input[2]
            let fieldOptions = (input[3]) ? input[3] : []
            value = await validate.validateField(fieldName, fieldType, fieldValue, fieldOptions)
            fieldObject[fieldName] = value
            if (value) inputObject = {...inputObject, ...fieldObject}
        }
       
        return (validate.errors.length > 0) ? {"errors": validate.errors } : inputObject
    },
}