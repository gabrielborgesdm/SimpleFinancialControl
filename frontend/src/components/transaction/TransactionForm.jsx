import "./TransactionForm.css"
import React, { Component } from "react"
import axios from "../services/axios"
import Main from "../template/Main"
import Input from "../form/Input"
import TextArea from "../form/TextArea"
import CountryHelpers from "../helpers/CountryHelpers"
import { withRouter } from "react-router-dom"

class TransactionForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: null,
            details: "",
            category: "others",
            amount: "",
            transactionDate: "",
            expense: true,
            submitStatus: {},
            invalidFields: [0, 1],
            country: CountryHelpers.getCountry(),
        }
        this.translate = this.props.translate
    }
    
    getTodayDate = () => new Date().toISOString().split('T')[0] 
    
    getTransaction = async (id) => {
        let response = null
        try {
            response = await axios.get(`/transaction/${id}`)
        } catch (error) {
            console.log(error)
        }

        if(response && response.data.success && response.data.transactions){
            const transaction = response.data.transactions[0]
            if (!transaction) return
            let amount, expense
            if(transaction.amount > 0) {
                amount = transaction.amount
                expense = false
            } else {
                amount = transaction.amount * -1
                expense = true
            }
            let details = transaction.details || ""
            let category = transaction.category
            let transactionDate = new Date(transaction.transactionDate).toISOString().split('T')[0]
            let invalidFields = [1, 1]
            this.setState({amount, expense, details, category, transactionDate, invalidFields})
        }

    }

    submitForm = async (e) => {
        e.preventDefault()
        let {id, expense, amount, details, category, transactionDate} = this.state

        const method = id ? "put" : "post"
        const url = id ? `/transaction/${id}` : `/transaction`
        
        amount = this.validateAmount(amount)
        console.log(amount)
        let newAmount= expense ? amount * -1 : amount
        document.getElementById("loading").style.visibility = 'visible'
        let response = null
        try {   
            response = await axios[method](url, {details, amount: newAmount, category, transactionDate})
        } catch (error) {
            console.log(error)
        }
        let submitStatus 
        if(response && response.data.success){
            if(!id) this.clearForm(e)
            submitStatus = {
                className: "text-success", 
                message: this.translate('TRANSACTIONS_FORM_SUBMITED_WITH_SUCCESS')
            }
        } else if(response && response.data.errors){
            submitStatus = {className: "text-danger", message: this.translate('TRANSACTIONS_FORM_COULDNT_BE_SUBMITED')}
        } else {
            submitStatus = {className: "text-danger", message: this.translate('SERVER_ERROR')}
        }
        this.setState({submitStatus})
        document.getElementById("loading").style.visibility = 'hidden'
    }

    validateAmount = (amount) => {
        if(localStorage.getItem("country") === "brazil"){
            amount = amount.replace("R$", "")
            amount = amount.replace(".", "")
            amount = amount.replace(",", ".")
        } else {
            amount = amount.replace("$", "")
        }
        amount = parseFloat(amount)
        return amount
    }

    checkInputEmpty = input => input.length === 0 ? this.translate('FORM_FIELD_CANT_BE_EMPTY') : "&nbsp;"

    checkErrorStatusEmpty = (fieldPosition, errorStatusEmpty) => {
        let {invalidFields} = this.state
        invalidFields[fieldPosition] = errorStatusEmpty === "&nbsp;" ? 1 : 0
        this.setState({invalidFields})
    }

    updateAmount = (amount) => {
        let small = document.querySelector("#transaction_amount_small")
        if(amount.length === 0) {
            small.innerHTML = this.checkInputEmpty(amount)
        } else if(amount < 1 ) {
            small.innerHTML = this.translate('TRANSACTIONS_FORM_FIELD_NEEDS_BE_GREATER_THAN_ZERO')
        }else {
            small.innerHTML = "&nbsp;"
        }
        this.checkErrorStatusEmpty(0, small.innerHTML)
        this.setState({amount, submitStatus: {}})
    }

    updateDetails = (e) => this.setState({details: e.target.value, submitStatus: {}})

    updateCategory = (e) => {
        let category
        switch(e.target.value){
            case "food":
            case "shopping":
            case "housing":
            case "transportation":
            case "vehicle":
            case "entertainment":
            case "technology":
            case "education":
            case "investments":
            case "expenses":
            case "work":
                category = e.target.value
                break
            default:
                category = "others"
        }
        this.setState({category, submitStatus: {}})
    }

    updateTransactionDate = (e) => {
        let transactionDate = e.target.value
        e.target.nextSibling.innerHTML = this.checkInputEmpty(transactionDate)
        this.checkErrorStatusEmpty(1, e.target.nextSibling.innerHTML)
        this.setState({transactionDate, submitStatus: {}})
    }
    
    clearForm = (e) => {
        for(let i = 0; i < document.getElementsByTagName("small").length; i++){
            document.getElementsByTagName("small")[i].innerHTML = "&nbsp;"
        }
        this.setState({amount: "", details: "", transactionDate: this.getTodayDate(), expense: true, invalidFields: [0, 1], submitStatus: {}})
    }

    componentDidMount(){
        let transactionDate = this.getTodayDate()
        
        let id = this.props.match.params.id
        if (id) this.getTransaction(id)
        this.setState({id, transactionDate})
    }

    render = () =>
        <Main className="form" icon="money" title={this.translate('TRANSACTIONS_FORM_TITLE')} subtitle={this.translate('TRANSACTIONS_FORM_SUBTITLE')}>
            <div className="p-3 mt-3">
                <span className={`mx-auto my-5 ${this.state.submitStatus.className}`}>{this.state.submitStatus.message}&nbsp;</span>
                <form method="post" onSubmit={e=> this.submitForm(e)}>
                    <div className="form-group d-inline-block px-0 pl-sm-0 pr-sm-3 col-12 col-sm-6 ">
                        <label htmlFor="amount">{this.translate('TRANSACTIONS_FORM_AMOUNT')}</label>
                        {CountryHelpers.getCoinInput(this.updateAmount, this.state.amount)}                    
                        <small id="transaction_amount_small" className="text-danger">&nbsp;</small>
                    </div>
                    <div className="form-group d-inline-block px-0 pl-sm-3 pr-0 col-12 col-sm-6">
                        <label htmlFor="category">{this.translate('TRANSACTIONS_FORM_CATEGORY')}</label>
                        <select name="category" id="category" className="form-control" onChange={(e)=>this.updateCategory(e)} value={this.state.category} >
                            <option value="others" defaultValue>{this.translate('CHARTS_CATEGORY_OTHERS')}</option>
                            <option value="food">{this.translate('CHARTS_CATEGORY_FOOD')}</option>
                            <option value="shopping">{this.translate('CHARTS_CATEGORY_SHOPPING')}</option>
                            <option value="housing">{this.translate('CHARTS_CATEGORY_HOUSING')}</option>
                            <option value="transportation">{this.translate('CHARTS_CATEGORY_TRANSPORTATION')}</option>
                            <option value="vehicle">{this.translate('CHARTS_CATEGORY_VEHICLE')}</option>
                            <option value="entertainment">{this.translate('CHARTS_CATEGORY_ENTERTAINMENT')}</option>
                            <option value="technology">{this.translate('CHARTS_CATEGORY_TECHNOLOGY')}</option>
                            <option value="education">{this.translate('CHARTS_CATEGORY_EDUCATION')}</option>
                            <option value="investments">{this.translate('CHARTS_CATEGORY_INVESTMENTS')}</option>
                            <option value="expenses">{this.translate('CHARTS_CATEGORY_EXPENSES')}</option>
                            <option value="work">{this.translate('CHARTS_CATEGORY_WORK')}</option>
                        </select>
                        <small className="text-danger">&nbsp;</small>
                    </div>
                    <div className="form-group px-sm-3 row justify-content-between d-flex">
                        <div className="col-12 col-sm-6 pl-sm-0">
                            <label className="bg-dark-red text-light transaction-radio col-12 py-2 my-1 m-sm-0" htmlFor="typeExpense">{this.translate('TRANSACTIONS_FORM_EXPENSE')}
                                <Input type="radio" name="transactionType" id="typeExpense" className="form-check-input" onChange={e => this.setState({expense: true, submitStatus: {}})} checked={this.state.expense}  />
                                <span></span>
                            </label>
                        </div>
                        <div className="col-12 col-sm-6 pr-sm-0">
                            <label className="bg-dark-blue text-light transaction-radio col-12 py-2 my-1 m-sm-0 " htmlFor="typeIncome">{this.translate('TRANSACTIONS_FORM_INCOME')}
                                <Input type="radio" name="transactionType" id="typeIncome" className="form-check-input" onChange={e => this.setState({expense: false, submitStatus: {}})} checked={!this.state.expense}/>
                                <span></span>
                            </label>
                        </div>
                        
                        <small className="text-danger">&nbsp;</small>
                    </div>
                    <div className="form-group m-0">
                        <label htmlFor="details">{this.translate('TRANSACTIONS_FORM_DETAILS')}</label>
                        <TextArea name="details" id="details" className="form-control" placeholder={this.translate('TRANSACTIONS_FORM_PLACEHOLDER_DETAILS')} onChange={(e)=>this.updateDetails(e)} value={this.state.details} ></TextArea>
                        <small className="text-danger">&nbsp;</small>
                    </div>
                    <div className="form-group m-0">
                        <label htmlFor="transactionDate">{this.translate('TRANSACTIONS_FORM_DATE')}</label>
                        <Input type="date" name="transactionDate" id="transactionDate" className="form-control" onChange={(e)=>this.updateTransactionDate(e)} value={this.state.transactionDate} />
                        <small className="text-danger">&nbsp;</small>
                    </div>
                    <div className="form-group">
                        <Input type="reset" className="btn m-2" onClick={e=>this.clearForm(e)} value={this.translate('FORM_BUTTON_CLEAR')}/>
                        <Input type="submit" className="btn m-2" disabled={this.state.invalidFields.filter((field)=> field).length < 2} value={this.translate('FORM_BUTTON_SUBMIT')}/>
                        <i id="loading" className="fa fa-spinner fa-spin" style={{visibility:"hidden"}}></i>
                    </div>
                </form>
            </div>
        </Main>
} 

export default withRouter(TransactionForm)

    

