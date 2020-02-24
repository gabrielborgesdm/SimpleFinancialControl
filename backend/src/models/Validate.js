const validator = require("validator")

class Validate{
    constructor () {
        this.errors = []
    }

    async validateField(fieldName, fieldType, fieldValue, fieldOptions) {
        
        if(fieldValue) {
            fieldValue = (typeof fieldValue == "string") ? this.sanitize(fieldValue) : fieldValue
            fieldValue = await this.validateAccordingToType(fieldValue, fieldType)
            if (fieldOptions) fieldValue = this.checkOptions(fieldValue, fieldOptions)
            fieldValue = (fieldValue) ? fieldValue : this.createError(fieldName, "invalid")
        } else{
            fieldValue = this.createError(fieldName, "missing")
        }
        return fieldValue
    }

    sanitize = (value) => validator.escape(value)

    async validateAccordingToType(fieldValue, fieldType){
        switch (fieldType) {
            case "email":
                fieldValue = await (validator.isEmail(fieldValue)) ? fieldValue : false
                break
            case "float":
                if(typeof fieldValue !== "number") fieldValue = validator.toFloat(fieldValue)
                break
            case "date":
                fieldValue = fieldValue.toString()
                fieldValue = validator.toDate(fieldValue)
                break
            
        }
        return fieldValue
    }

    checkOptions(fieldValue, fieldOptions){
        if(fieldOptions.toFixed){
            fieldValue = fieldValue.toFixed(fieldOptions.toFixed)
        }
       
        if (fieldOptions.enum) {
            let valid = false
            fieldOptions.enum.forEach(element => {
                valid = (fieldValue == element) ? true : valid
            })
            fieldValue = (valid) ? fieldValue : false
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