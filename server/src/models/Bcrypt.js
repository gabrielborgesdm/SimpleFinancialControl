const bcrypt = require("bcrypt")

class Bcrypt {
    constructor () {
        this.saltRounds = 10
    }

    hash = (password) =>{
        bcrypt.hash(password, this.saltRounds, function(err, hash) {
            if(hash){
                return hash
            }
        });
        
    }

    compare = (password, hash) => {
        const match = bcrypt.compare(password, hash);
        return match == true ? match : false
    }
}

module.exports = Bcrypt