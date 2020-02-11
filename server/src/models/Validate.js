const validator = require("validator")

class Validate {
    constructor () {
        this.status = 200
        this.errors = []
        this.HasError = 0
    }

    getResponse = () =>{
        let response = {}
        response.status = this.status
        if (this.HasError){
            response.errors = this.errors
        }
        return response
    }

    validateField(fieldName, fieldValue, fieldType) {
        if(fieldValue) {
            fieldValue = this.sanitize(fieldValue)
            fieldValue = (fieldType !== "string") ? this.validateAccordingToType(fieldValue, fieldType) : fieldValue
            fieldValue = (fieldValue) ? fieldValue : this.addError(fieldName, "invalid")
        } else{
            fieldValue = this.addError(fieldName, "missing")
        }
        return fieldValue
    }

    sanitize = (value) => validator.escape(value)

    validateAccordingToType(fieldValue, fieldType){
        switch (fieldType) {
            case "email":
                fieldValue = (validator.isEmail(fieldValue)) ? fieldValue : false
                break
        }
        return fieldValue
    }

    addError(fieldName, state = "invalid"){
        this.status = 400
        this.HasError = 1
        this.errors.push(this.buildErrorBody(fieldName, state))
        return false
    }
    
    buildErrorBody = (fieldName, state) => ({
        "fieldName": fieldName,
        "state": state,
        "message" : `${fieldName} is ${state}`
    })

}

module.exports = Validate