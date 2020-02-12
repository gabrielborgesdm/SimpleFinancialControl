class Response {
    constructor () {
        this.status = 200
        this.success = true
        this.errors = []
        
    }

    addError(name, state, message){
        this.changeStatusCode(400)
        this.errors.push({"name": name, "state" : state, "message" : message})
    }

    addMultipleErrors(errors){
        this.changeStatusCode(400)
        this.errors.push(...errors)
    }

    changeStatusCode(status){
        this.status = status
        this.success = (status == 200) ? true : false
    }

    getResponse(){
        let response = {"status": this.status, "success": this.success}
        if(this.errors.length > 0){
            response = {...response, "errors": this.errors}
        }
        return response
    }
}

module.exports = Response