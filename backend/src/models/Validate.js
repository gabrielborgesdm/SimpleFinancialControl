const validator = require("validator")

class Validate{
    constructor () {
        this.errors = []
    }

    async validateField(fieldName, fieldType, fieldValue) {
        if(fieldValue) {
            fieldValue = this.sanitize(fieldValue)
            fieldValue = await this.validateAccordingToType(fieldValue, fieldType)
            fieldValue = (fieldValue) ? fieldValue : this.createError(fieldName, "invalid")
        } else{
            fieldValue = this.createError(fieldName, "missing")
        }
        return fieldValue
    }

    sanitize = (value) => validator.escape(value)

    async validateAccordingToType(fieldValue, fieldType){
        fieldValue = this.sanitize(fieldValue)
        switch (fieldType) {
            case "email":
                fieldValue = await (validator.isEmail(fieldValue)) ? fieldValue : false
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
        return false 
    }

}

module.exports = Validate