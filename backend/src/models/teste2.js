 class Teste {
    constructor() {
        this.a = 'asd'
        this.b = 'asdad'
        this.c = 'asbbbbd'
        this.response = {"a": this.a, "b": this.b, "c": this.c, }
    }
    fazer(){
        this.c = "meu nome é joao"
        console.log(this)
    }
 }

teste = new Teste()
teste.fazer()