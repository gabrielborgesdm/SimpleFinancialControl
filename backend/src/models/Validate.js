const validator = require("validator")

class Validate{
    constructor () {
        this.errors = []
    }

    validateField(fieldName, fieldValue) {
        let fieldType = (fieldName == "email") ? "email" : "string"
        if(fieldValue) {
            fieldValue = this.sanitize(fieldValue)
            fieldValue = (fieldType !== "string") ? this.validateAccordingToType(fieldValue, fieldType) : fieldValue
            fieldValue = (fieldValue) ? fieldValue : this.createError(fieldName, "invalid")
        } else{
            fieldValue = this.createError(fieldName, "missing")
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

    createError (fieldName, state = "invalid"){
        this.status = 200
        this.success = false
        this.errors.push({
            "name": fieldName,
            "state": state,
            "message" : `${fieldName} is ${state}`
        })    
    }

}

module.exports = Validate