class Translation {
    constructor (){
        this.language =  window.navigator.userLanguage || window.navigator.language
        if(this.language !== "pt-BR" && this.language !== "en-US") this.language = "en-US"
        this.json = {
            "pt-BR": {
                SERVER_ERROR: "Aconteceu algo de errado com os servidores, tente novamente mais tarde.",
                
                FORM_BUTTON_SUBMIT: "Enviar",
                FORM_BUTTON_CLEAR: "Limpar",
                FORM_FIELD_CANT_BE_EMPTY: "O campo não pode estar vazio",
                FORM_LABEL_NAME: "Nome",
                FORM_PLACEHOLDER_NAME: "Digite o seu nome",
                FORM_LABEL_EMAIL: "E-mail",
                FORM_PLACEHOLDER_EMAIL: "Digite o seu e-mail",
                FORM_LABEL_PASSWORD: "Senha",
                FORM_PLACEHOLDER_PASSWORD: "Digite a sua senha",
                FORM_LABEL_COUNTRY: "País (Tipo da moeda)",
                FORM_OPTION_BRAZIL: "Brazil - R$",
                FORM_OPTION_USA: "U.S.A - $",

                HOME_TITLE: "Início",
                HOME_SUBTITLE: "Simplifique as suas finanças",
                HOME_WELCOME: "Bem Vindo(a)!",
                HOME_DESCRIPTION: `O Controle Simples de Finanças é uma aplicação em que você pode anotar suas receitas e despesas e dessa forma entender
                como o seu dinheiro é gasto.`,

                NAV_HOME: "Início",
                NAV_LOGIN: "Entrar",
                NAV_SIGNUP: "Criar Conta",
                NAV_TRANSACTIONS: "Transações",
                NAV_ADD_TRANSACTIONS: "Nova Transação",
                NAV_LOGOUT: "Sair",

                LOGIN_TITLE: "Entrar",
                LOGIN_SUBTITLE: "Entre com a sua conta",
                LOGIN_INCORRECT: "Senha incorreta.",
                LOGIN_INACTIVE_ACCOUNT: "Sua conta precisa ser confirmada, confira o seu e-mail para confirmar a sua conta.",
                LOGIN_NOEXISTENT_ACCOUNT: "Essa conta não existe.",

                SIGNUP_TITLE: "Criar Conta",
                SIGNUP_SUBTITLE: "Crie uma conta",
                SIGNUP_SUCCESS: "Conta criada com sucesso! Confira o seu e-mail para confirmá-la.",
                SIGNUP_IN_USE: "Este e-mail já está sendo utilizado, tente criar uma conta com outro.",
                SIGNUP_COULDNT_CREATE: "Não foi possível criar a conta, tente novamente mais tarde.",

                TRANSACTIONS_TITLE: "Transações",
                TRANSACTIONS_SUBTITLE: "Visualize suas Receitas e Despesas.",
                TRANSACTIONS_WEALTH: "Renda",
                TRANSACTIONS_EXPENSES: "Despesas",
                TRANSACTIONS_BALANCE: "Balanço",
                TRANSACTIONS_INCOMES: "Receitas",
                TRANSACTIONS_SEE_DETAILS: "Ver Transações detalhadamente",
                TRANSACTIONS_INCOMES_X_EXPENSES: "Receitas x Despesas",
                TRANSACTIONS_GROUPED_BY_DATE: "Agrupados por Data",
                TRANSACTIONS_GROUPED_BY_CATEGORIES: "Agrupados por Categorias",
                TRANSACTIONS_A_TRANSACTION: "Adicionar Transação",

                DATE_DROPDOWN_LAST_WEEK: "Última Semana",
                DATE_DROPDOWN_LAST_MONTH: "Último Mês",
                DATE_DROPDOWN_LAST_YEAR: "Último Ano",
                DATE_DROPDOWN_CUSTOM_DATE: "Data Customizada",
                DATE_DROPDOWN_ALL_ENTRIES: "Todos Registros",
                DATE_DROPDOWN_FILTER_BY_DATE: "Filtrar por Data",
                DATE_DROPDOWN_START_DATE: "Data Inicial",
                DATE_DROPDOWN_END_DATE: "Data Final",
                DATE_DROPDOWN_START_DATE_CANT_BE_EMPTY: "Data Inicial não pode estar vazia",
                DATE_DROPDOWN_END_DATE_CANT_BE_EMPTY: "Data Final não pode estar vazia",
                DATE_DROPDOWN_CLOSE: "Fechar",
                DATE_DROPDOWN_SAVE: "Salvar",

            },

            "en-US": {
                SERVER_ERROR: "Something went wrong with the server, try again later.",
                
                FORM_BUTTON_SUBMIT: "Submit",
                FORM_BUTTON_CLEAR: "Clear",
                FORM_FIELD_CANT_BE_EMPTY: "Field can't be empty",
                FORM_LABEL_NAME: "Name",
                FORM_PLACEHOLDER_NAME: "Enter your name",
                FORM_LABEL_EMAIL: "E-mail",
                FORM_PLACEHOLDER_EMAIL: "Enter your e-mail",
                FORM_LABEL_PASSWORD: "Password",
                FORM_PLACEHOLDER_PASSWORD: "Enter your Password",
                FORM_LABEL_COUNTRY: "Country (Currency Type)",
                FORM_OPTION_BRAZIL: "Brazil - R$",
                FORM_OPTION_USA: "U.S.A - $",
                
                HOME_TITLE: "Home",
                HOME_SUBTITLE: "Simplify your finances",
                HOME_WELCOME: "Welcome",
                HOME_DESCRIPTION: `Simple financial control is an application in which you can takes notes of your incomes and expenses, having a better
                 understanding about how you spend your money.`,

                NAV_HOME: "Home",
                NAV_LOGIN: "Login",
                NAV_SIGNUP: "Sign up",
                NAV_TRANSACTIONS: "Transactions",
                NAV_ADD_TRANSACTIONS: "Add Transactions",
                NAV_LOGOUT: "Logout",

                LOGIN_TITLE: "Login",
                LOGIN_SUBTITLE: "Log in your account",
                LOGIN_INCORRECT: "Password is wrong.",
                LOGIN_INACTIVE_ACCOUNT: "Your account needs to be confirmed, check your e-mail to confirm your account.",
                LOGIN_NOEXISTENT_ACCOUNT: "Account does not exist.",

                SIGNUP_TITLE: "Sign up",
                SIGNUP_SUBTITLE: "Create an account",
                SIGNUP_SUCCESS: "Account created with success! Check your e-mail to confirm your account.",
                SIGNUP_IN_USE: "E-mail is already in use, try with another one.",
                SIGNUP_COULDNT_CREATE: "It wasn't possible to create the account.",

                TRANSACTIONS_TITLE: "Transactions",
                TRANSACTIONS_SUBTITLE: "Visualize Incomes and Expenses.",
                TRANSACTIONS_WEALTH: "Wealth",
                TRANSACTIONS_EXPENSES: "Expenses",
                TRANSACTIONS_BALANCE: "Balance",
                TRANSACTIONS_INCOMES: "Incomes",
                TRANSACTIONS_SEE_DETAILS: "See Transaction's Details",
                TRANSACTIONS_INCOMES_X_EXPENSES: "Incomes x Expenses",
                TRANSACTIONS_GROUPED_BY_DATE: "Grouped By Date",
                TRANSACTIONS_GROUPED_BY_CATEGORIES: "Grouped By Categories",
                TRANSACTIONS_A_TRANSACTION: "Add a Transaction",

                DATE_DROPDOWN_LAST_WEEK: "Last Week",
                DATE_DROPDOWN_LAST_MONTH: "Last Month",
                DATE_DROPDOWN_LAST_YEAR: "Last Year",
                DATE_DROPDOWN_CUSTOM_DATE: "Custom Date",
                DATE_DROPDOWN_ALL_ENTRIES: "All Entries",
                DATE_DROPDOWN_FILTER_BY_DATE: "Filter By Date",
                DATE_DROPDOWN_START_DATE: "Start Date",
                DATE_DROPDOWN_END_DATE: "End Date",
                DATE_DROPDOWN_START_DATE_CANT_BE_EMPTY: "Start Date can't be empty",
                DATE_DROPDOWN_END_DATE_CANT_BE_EMPTY: "End Date can't be empty",
                DATE_DROPDOWN_CLOSE: "Close",
                DATE_DROPDOWN_SAVE: "Save",
            }
        }
    }

    translate = (key) => {
        this.language = "pt-BR"
        //this.language = "en-US"
        let translation = this.json[this.language][key] || null
        return translation || key
    }
}

export default new Translation().translate