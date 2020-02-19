class Response {
    constructor () {
        this.body = {
            status: 200,
            success: true,
            errors: []
        }
    }

    addParams(params){
        for (const [key, value] of Object.entries(params)) {
            this.body[key] = value
        }
    }

    getParams (){
        if (this.body.errors){
            if (this.body.errors.length == 0) delete this.body.errors
        }
        return this.body
    }

    addError(name, state, message){
        this.body.success = false
        this.body.errors.push({"name": name, "state" : state, "message" : message})
    }

    addMultipleErrors(errors){
        this.body.success = false
        this.body.errors.push(...errors)
    }

    checkSuccess = () => this.body.success

    getStatus = () => this.body.status

}

module.exports = Response


