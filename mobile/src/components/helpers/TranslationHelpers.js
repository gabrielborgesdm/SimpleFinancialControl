import { NativeModules } from "react-native"


export const translate = (key) => {
    let language = getDisplayLanguage()
    language = "pt_BR"
    let translation = (translationJson[language] && translationJson[language][key]) ? translationJson[language][key] : null
    return translation || key
}

export const getDisplayLanguage = () => {
    let language = NativeModules.I18nManager.localeIdentifier
    language = language.includes("pt") ? "pt_br" : "en_US"
    return language
}
  
const translationJson = {
    "pt_BR": {
        SERVER_ERROR: "Aconteceu algo de errado com os servidores, tente novamente mais tarde.",
        CREATE_ACCOUNT: "Criar conta",
        FORM_BUTTON_SUBMIT: "Enviar",
        FORM_BUTTON_CLEAR: "Limpar",
        FORM_FIELD_CANT_BE_EMPTY: "O campo não pode estar vazio",
        FORM_LABEL_NAME: "Nome",
        FORM_FULLNAME: "Nome Completo",
        FORM_INSERT_YOUR_FULL_NAME: "Insira o seu nome completo",
        FORM_PLACEHOLDER_NAME: "Digite o seu nome",
        FORM_LABEL_EMAIL: "Endereço de e-mail",
        FORM_INSERT_A_VALID_EMAIL: "Insira um endereço de e-mail válido",
        FORM_INSERT_AN_EMAIL: "Insira um endereço de e-mail",
        FORM_PLACEHOLDER_EMAIL: "Digite o seu e-mail",
        FORM_LABEL_PASSWORD: "Senha",
        FORM_PLACEHOLDER_PASSWORD: "Digite a sua senha",
        FORM_LABEL_REPEAT_THE_PASSWORD: "Repita a senha",
        FORM_PASSWORD_MUST_BE_THE_SAME: "As senhas precisam ser iguais",
        FORM_PASSWORD_MUST_HAVE_MORE_THAN_SIX_CHAR: "A senha precisa ter pelos menos 6 carácteres",
        FORM_INSERT_YOUR_PASSWORD: "Insira a sua senha",
        FORM_REPEAT_YOUR_PASSWORD: "Repita a sua senha",
        FORM_INSERT_YOUR_COUNTRY: "Insira o seu país",
        FORM_PASSWORD_IS_INSECURE: "A senha é pouco segura",
        FORM_FORGOT_YOUR_PASSWORD: "Esqueceu a sua senha?",
        FORM_LABEL_COUNTRY: "País (Tipo da moeda)",
        FORM_OPTION_BRAZIL: "Brazil - R$",
        FORM_OPTION_USA: "U.S.A - $",

        TABLE_DETAILS: "Detalhes",
        TABLE_AMOUNT: "Quantidade",
        TABLE_CATEGORY: "Categoria",
        TABLE_TYPE: "Tipo",
        TABLE_DATE: "Data",
        TABLE_ACTIONS: "Ações",

        ICON_LOADING: "Carregando",

        MONTH_SHORT_JAN: "jan",
        MONTH_SHORT_FEB: "fev",
        MONTH_SHORT_MAR: "mar",
        MONTH_SHORT_APR: "abr",
        MONTH_SHORT_MAY: "mai",
        MONTH_SHORT_JUN: "jun",
        MONTH_SHORT_JUL: "jul",
        MONTH_SHORT_AUG: "ago",
        MONTH_SHORT_SEP: "set",
        MONTH_SHORT_OCT: "out",
        MONTH_SHORT_NOV: "nov",
        MONTH_SHORT_DEC: "dez",

        STRONG_PASSWORD_INSECURE: "Inseguro",
        STRONG_PASSWORD_WEAK: "Fraco",
        STRONG_PASSWORD_MEDIUM: "Médio",
        STRONG_PASSWORD_STRONG: "Forte",
        
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
        TRANSACTIONS_GROUPED_BY_DATE: "Agrupados por data",
        TRANSACTIONS_GROUPED_BY_CATEGORIES: "Agrupados por Categorias",
        TRANSACTIONS_NO_TRANSACTIONS: "Ainda não há transações cadastradas.",
        TRANSACTIONS_ADD_TRANSACTION: "Adicionar Transação",

        DATE_DROPDOWN_LAST_WEEK: "Última Semana",
        DATE_DROPDOWN_LAST_MONTH: "Último Mês",
        DATE_DROPDOWN_LAST_YEAR: "Últimos 12 meses",
        DATE_DROPDOWN_CUSTOM_DATE: "Data Customizada",
        DATE_DROPDOWN_ALL_ENTRIES: "Todos Registros",
        DATE_DROPDOWN_FILTER_BY_DATE: "Filtrar por data",
        DATE_DROPDOWN_START_DATE: "Data Inicial",
        DATE_DROPDOWN_END_DATE: "Data Final",
        DATE_DROPDOWN_START_DATE_CANT_BE_EMPTY: "Data Inicial não pode estar vazia",
        DATE_DROPDOWN_END_DATE_CANT_BE_EMPTY: "Data Final não pode estar vazia",
        DATE_DROPDOWN_CLOSE: "Fechar",
        DATE_DROPDOWN_SAVE: "Salvar",

        CHARTS_MONTHLY_EXPENSES: "Despesas mensais",
        CHARTS_MONTHLY_INCOMES: "Receitas mensais",
        CHARTS_DAILY_EXPENSES: "Despesas diárias",
        CHARTS_DAILY_INCOMES: "Receitas diárias",
        CHARTS_MONTHLY_TRANSACTIONS: "Transações mensais",
        CHARTS_DAILY_TRANSACTIONS: "Transações diárias",
        CHARTS_CATEGORY: "Categoria",
        CHARTS_CATEGORY_OTHERS: "Outros",
        CHARTS_CATEGORY_FOOD: "Alimentos",
        CHARTS_CATEGORY_SHOPPING: "Compras",
        CHARTS_CATEGORY_HOUSING: "Moradia",
        CHARTS_CATEGORY_TRANSPORTATION: "Transporte",
        CHARTS_CATEGORY_VEHICLE: "Veículo",
        CHARTS_CATEGORY_ENTERTAINMENT: "Entretenimento",
        CHARTS_CATEGORY_TECHNOLOGY: "Tecnologia",
        CHARTS_CATEGORY_EDUCATION: "Educação",
        CHARTS_CATEGORY_INVESTMENTS: "Investimentos",
        CHARTS_CATEGORY_EXPENSES: "Despesas",
        CHARTS_CATEGORY_WORK: "Trabalho",

        TRANSACTIONS_LIST_TITLE: "Transações Detalhadas",
        TRANSACTIONS_LIST_SUBTITLE: "Visualize e gerencie suas transações",
        TRANSACTIONS_LIST_WARNING_DELETE_RECORD: "Você tem certeza que deseja apagar esta transação?",
        TRANSACTIONS_LIST_COULDNT_DELETE_RECORD: "Não foi possível apagar esta transação.",
        TRANSACTIONS_LIST_NO_DESCRIPTION: "Sem descrição",
        TRANSACTIONS_LIST_FILTER: "Filtre suas transações",
        TRANSACTIONS_LIST_INCOME: "Receita",
        TRANSACTIONS_LIST_EXPENSE: "Despesa",

        TRANSACTIONS_FORM_SUBMITED_WITH_SUCCESS: "Transação submetida com sucesso!",
        TRANSACTIONS_FORM_COULDNT_BE_SUBMITED: "Não foi possível submeter a transação, tente novamente mais tarde.",
        TRANSACTIONS_FORM_FIELD_NEEDS_BE_GREATER_THAN_ZERO: "O campo precisa ser maior do que zero",
        TRANSACTIONS_FORM_TITLE: "Transações",
        TRANSACTIONS_FORM_SUBTITLE: "Adicione ou edite suas transações",
        TRANSACTIONS_FORM_AMOUNT: "Quantidade",
        TRANSACTIONS_FORM_CATEGORY: "Categoria",
        TRANSACTIONS_FORM_EXPENSE: "Despesa",
        TRANSACTIONS_FORM_INCOME: "Receita",
        TRANSACTIONS_FORM_DETAILS: "Detalhes (Opcional)",
        TRANSACTIONS_FORM_DATE: "Data",
        TRANSACTIONS_FORM_PLACEHOLDER_DETAILS: "Detalhes sobre a transação",

        TRANSACTIONS_LOGOUT_TITLE: "Sair",
        TRANSACTIONS_LOGOUT_SUBTITLE: "Sair de sua conta",
        TRANSACTIONS_LOGOUT_ARE_YOU_SURE_YOU_WANT_TO_LEAVE: "Você tem certeza que deseja sair de sua conta?",
        TRANSACTIONS_LOGOUT_YES: "SIM",

        CONFIRM_ACCOUNT_DENIED: "Acesso Negado, tente novamente na mesma rede em que você criou a sua conta",
        CONFIRM_ACCOUNT_SOMETHING_WENT_WRONG: "Aconteceu algo de errado",
        CONFIRM_ACCOUNT_ACTIVATING_ACCOUNT: "Ativando conta",
        CONFIRM_ACCOUNT_ACTIVATED_ACCOUNT: "Conta ativada com sucesso",
        CONFIRM_ACCOUNT_LOGIN: "Entrar",
        CONFIRM_ACCOUNT_SIGNUP: "Cadastrar",
        CONFIRM_ACCOUNT_ACCOUNT_TITLE: "Ativação da Conta",
        CONFIRM_ACCOUNT_ACCOUNT_SUBTITLE: "Você consiguirá utilizar conta após sua ativação",

        RECOVER_PASSWORD_TITLE: "Recupere a sua senha",
        RECOVER_PASSWORD_NEW_PASSWORD: "Nova senha",
        RECOVER_PASSWORD_SUBTITLE: "Recupere a sua senha se você a perdeu",
        RECOVER_PASSWORD_PASSWORDS_MUST_BE_THE_SAME: "As senhas precisam ser Iguais",
        RECOVER_PASSWORD_ACCESS_EMAIL_TO_RECOVER_PASSWORD: "Acesse o seu e-mail para recuperar a sua senha.",
        RECOVER_PASSWORD_NOT_POSSIBLE_TO_CHANGE_PASSWORD: "Não foi possível mudar a sua senha.",
        RECOVER_PASSWORD_PASSWORD_UPDATED_WITH_SUCCESS_DO_YOU_WANT_LOGIN: "Senha alterada com sucesso, você deseja entrar em sua conta?"

    },

    "en_US": {
        SERVER_ERROR: "Something went wrong with the server, try again later.",
        CREATE_ACCOUNT: "Create account",
        FORM_BUTTON_SUBMIT: "Submit",
        FORM_BUTTON_CLEAR: "Clear",
        FORM_FIELD_CANT_BE_EMPTY: "Field can't be empty",
        FORM_LABEL_NAME: "Name",
        FORM_FULLNAME: "Full name",
        FORM_INSERT_YOUR_FULL_NAME: "Please enter your full name",
        FORM_PLACEHOLDER_NAME: "Enter your name",
        FORM_LABEL_EMAIL: "E-mail address",
        FORM_INSERT_A_VALID_EMAIL: "Please enter a valid email address",
        FORM_INSERT_AN_EMAIL: "Please enter an email address",
        FORM_PLACEHOLDER_EMAIL: "Enter your e-mail",
        FORM_LABEL_PASSWORD: "Password",
        FORM_LABEL_REPEAT_THE_PASSWORD: "Repeat the password",
        FORM_PASSWORD_MUST_BE_THE_SAME: "Passwords must be the same",
        FORM_PASSWORD_MUST_HAVE_MORE_THAN_SIX_CHAR: "Password must have at least 6 characters",
        FORM_INSERT_YOUR_PASSWORD: "Please enter your password",
        FORM_REPEAT_YOUR_PASSWORD: "Please repeat your password",
        FORM_PASSWORD_IS_INSECURE: "Password is not secure",
        FORM_INSERT_YOUR_COUNTRY: "Please enter your country",
        FORM_FORGOT_YOUR_PASSWORD: "Forgot your password?",
        FORM_PLACEHOLDER_PASSWORD: "Enter your Password",
        FORM_LABEL_COUNTRY: "Country (Currency Type)",
        FORM_OPTION_BRAZIL: "Brazil - R$",
        FORM_OPTION_USA: "U.S.A - $",
        
        TABLE_DETAILS: "Details",
        TABLE_AMOUNT: "Amount",
        TABLE_CATEGORY: "Category",
        TABLE_TYPE: "Type",
        TABLE_DATE: "Date",
        TABLE_ACTIONS: "Actions",

        ICON_LOADING: "Loading",
        
        MONTH_SHORT_JAN: "jan",
        MONTH_SHORT_FEB: "feb",
        MONTH_SHORT_MAR: "mar",
        MONTH_SHORT_APR: "apr",
        MONTH_SHORT_MAY: "may",
        MONTH_SHORT_JUN: "jun",
        MONTH_SHORT_JUL: "jul",
        MONTH_SHORT_AUG: "aug",
        MONTH_SHORT_SEP: "sep",
        MONTH_SHORT_OCT: "oct",
        MONTH_SHORT_NOV: "nov",
        MONTH_SHORT_DEC: "dec",

        STRONG_PASSWORD_INSECURE: "Insecure",
        STRONG_PASSWORD_WEAK: "Weak",
        STRONG_PASSWORD_MEDIUM: "Medium",
        STRONG_PASSWORD_STRONG: "Strong",

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
        TRANSACTIONS_NO_TRANSACTIONS: "There are no transactions registered.",
        TRANSACTIONS_ADD_TRANSACTION: "Add a Transaction",

        DATE_DROPDOWN_LAST_WEEK: "Last Week",
        DATE_DROPDOWN_LAST_MONTH: "Last Month",
        DATE_DROPDOWN_LAST_YEAR: "Last 12 months",
        DATE_DROPDOWN_CUSTOM_DATE: "Custom Date",
        DATE_DROPDOWN_ALL_ENTRIES: "All Entries",
        DATE_DROPDOWN_FILTER_BY_DATE: "Filter By Date",
        DATE_DROPDOWN_START_DATE: "Start Date",
        DATE_DROPDOWN_END_DATE: "End Date",
        DATE_DROPDOWN_START_DATE_CANT_BE_EMPTY: "Start Date can't be empty",
        DATE_DROPDOWN_END_DATE_CANT_BE_EMPTY: "End Date can't be empty",
        DATE_DROPDOWN_CLOSE: "Close",
        DATE_DROPDOWN_SAVE: "Save",

        CHARTS_MONTHLY_EXPENSES: "Monthly Expenses",
        CHARTS_MONTHLY_INCOMES: "Monthly Incomes",
        CHARTS_DAILY_EXPENSES: "Daily Expense",
        CHARTS_DAILY_INCOMES: "Daily Incomes",
        CHARTS_CATEGORY: "Category",
        CHARTS_CATEGORY_OTHERS: "Others",
        CHARTS_CATEGORY_FOOD: "Food",
        CHARTS_CATEGORY_SHOPPING: "Shopping",
        CHARTS_CATEGORY_HOUSING: "Housing",
        CHARTS_CATEGORY_TRANSPORTATION: "Transportation",
        CHARTS_CATEGORY_VEHICLE: "Vehicle",
        CHARTS_CATEGORY_ENTERTAINMENT: "Entertainment",
        CHARTS_CATEGORY_TECHNOLOGY: "Technology",
        CHARTS_CATEGORY_EDUCATION: "Education",
        CHARTS_CATEGORY_INVESTMENTS: "Investments",
        CHARTS_CATEGORY_EXPENSES: "Expenses",
        CHARTS_CATEGORY_WORK: "Work",

        TRANSACTIONS_LIST_TITLE: "Detailed Transactions",
        TRANSACTIONS_LIST_SUBTITLE: "Visualize and Manage your Transactions",
        TRANSACTIONS_LIST_WARNING_DELETE_RECORD: "Are you sure you want to delete this record?",
        TRANSACTIONS_LIST_COULDNT_DELETE_RECORD: "It wasn't possible to delete this transaction.",
        TRANSACTIONS_LIST_NO_DESCRIPTION: "No description",
        TRANSACTIONS_LIST_FILTER: "Filter your transactions",
        TRANSACTIONS_LIST_INCOME: "Income",
        TRANSACTIONS_LIST_EXPENSE: "Expense",
        
        TRANSACTIONS_FORM_SUBMITED_WITH_SUCCESS: "Transaction posted with success!",
        TRANSACTIONS_FORM_COULDNT_BE_SUBMITED: "The transaction couldn't be submited, try again later.",
        TRANSACTIONS_FORM_FIELD_NEEDS_BE_GREATER_THAN_ZERO: "The field needs to be greater than zero",
        TRANSACTIONS_FORM_TITLE: "Transactions",
        TRANSACTIONS_FORM_SUBTITLE: "Add or update a Transaction",
        TRANSACTIONS_FORM_AMOUNT: "Amount",
        TRANSACTIONS_FORM_CATEGORY: "Category",
        TRANSACTIONS_FORM_EXPENSE: "Expense",
        TRANSACTIONS_FORM_INCOME: "Income",
        TRANSACTIONS_FORM_DETAILS: "Details (Optional)",
        TRANSACTIONS_FORM_DATE: "Date",
        TRANSACTIONS_FORM_PLACEHOLDER_DETAILS: "Details about the transaction",

        TRANSACTIONS_LOGOUT_TITLE: "Logout",
        TRANSACTIONS_LOGOUT_SUBTITLE: "Log out your account",
        TRANSACTIONS_LOGOUT_ARE_YOU_SURE_YOU_WANT_TO_LEAVE: "Are you sure you want to sign out of your account?",
        TRANSACTIONS_LOGOUT_YES: "YES",

        CONFIRM_ACCOUNT_DENIED: "Access denied, try again with the same internet connection you created your account",
        CONFIRM_ACCOUNT_SOMETHING_WENT_WRONG: "Something went wrong",
        CONFIRM_ACCOUNT_ACTIVATING_ACCOUNT: "Activating account",
        CONFIRM_ACCOUNT_ACTIVATED_ACCOUNT: "Account activated with success",
        CONFIRM_ACCOUNT_LOGIN: "Log in",
        CONFIRM_ACCOUNT_SIGNUP: "Sign Up",
        CONFIRM_ACCOUNT_ACCOUNT_TITLE: "Account Activation",
        CONFIRM_ACCOUNT_ACCOUNT_SUBTITLE: "You will be able to use your account after its activation",
        
        RECOVER_PASSWORD_TITLE: "Recover your password",
        RECOVER_PASSWORD_NEW_PASSWORD: "New password",
        RECOVER_PASSWORD_SUBTITLE: "Recover your password if you lost it.",
        RECOVER_PASSWORD_PASSWORDS_MUST_BE_THE_SAME: "The passwords must be the same",
        RECOVER_PASSWORD_ACCESS_EMAIL_TO_RECOVER_PASSWORD: "Access your e-mail to recover your password",
        RECOVER_PASSWORD_NOT_POSSIBLE_TO_CHANGE_PASSWORD: "It wasn't possible to change your password",
        RECOVER_PASSWORD_PASSWORD_UPDATED_WITH_SUCCESS_DO_YOU_WANT_LOGIN: "Password updated with success! Do you want to log in?",
    }

}