import "./TransactionForm.css"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Main from "../template/Main"
import Input from "../form/Input"
import TextArea from "../form/TextArea"


const TransactionForm = () => {

    const token = localStorage.getItem("Token") 
    const baseUrl = process.env.REACT_APP_API_BASE_URL
    axios.defaults.headers["Authorization"] = `Bearer ${token}`
    const {id} = useParams()
    const getTodayDate = () => new Date().toISOString().split('T')[0] 

    const [details, setDetails] = useState("")
    const [category, setCategory] = useState("others")
    const [amount, setAmount] = useState("")
    const [transactionDate, setTransactionDate] = useState(getTodayDate())
    const [expense, setExpense] = useState(true)
    const [submitStatus, setSubmitStatus] = useState({})
    const [invalidFields, setInvalidFields] = useState([0, 1])

    useEffect(()=>{
        setSubmitStatus({})
    }, [amount, details, expense, transactionDate])
    
    useEffect(() => {
        if (id) {
            const url = `${baseUrl}/transaction/${id}` 
            axios.get(url)
            .then(response => {
                if(response.data.success){
                    const transaction = response.data.transactions[0]
                    if(transaction.amount > 0) {
                        setAmount(transaction.amount)
                        setExpense(false)
                    } else {
                        setAmount(transaction.amount * -1)
                        setExpense(true)
                    }
                    setDetails(transaction.details || "")
                    setCategory(transaction.category)
                    setTransactionDate(new Date(transaction.transactionDate).toISOString().split('T')[0] )
                    setInvalidFields([1, 1])
                }
            })
            .catch(error => {
                console.log(url, error)
            })
        }
    }, [id, baseUrl])

    const submitForm = (e) => {
        e.preventDefault()
        const method = id ? "put" : "post"
        const url = id ? `${baseUrl}/transaction/${id}` : `${baseUrl}/transaction`

        let newAmount= expense ? amount * -1 : amount
        document.getElementById("loading").style.visibility = 'visible'

        axios[method](url, {details, amount: newAmount, category, transactionDate})
        .then(response => {
            if(response.data.success){
                clearForm(e)
                let newStatus = {className: "text-success", message: "Transaction posted with success"}
                setSubmitStatus(newStatus)
            } else{
                console.log(response.data.errors)
                let newStatus = {className: "text-danger", message: response.data.errors[0].message}
                setSubmitStatus(newStatus)
            }
        })
        .catch(error => {
            console.log(error)
            let newStatus = {className: "text-danger", message: "It wasn't possible to post transaction"}
            setSubmitStatus(newStatus)
        })
        .finally(()=> document.getElementById("loading").style.visibility = 'hidden')
    }
    const checkInputEmpty = input => input.length === 0 ? "Field can't be empty" : ""

    const checkErrorStatusEmpty = (fieldPosition, errorStatusEmpty) => {
        let newInvalidFields = invalidFields
        newInvalidFields[fieldPosition] = errorStatusEmpty === "" ? 1 : 0
        setInvalidFields(newInvalidFields)
    }

    const updateAmount = (e) => {
        let amount = e.target.value
        if(amount.length === 0) {
            e.target.nextSibling.innerHTML = checkInputEmpty(amount)
        } else if(amount < 1 ) {
            e.target.nextSibling.innerHTML = "needs to be greater than zero"
        } else if (isNaN(amount)) {
            e.target.nextSibling.innerHTML = "Amount need's to be a number"
        }else {
            e.target.nextSibling.innerHTML = ""
        }
        checkErrorStatusEmpty(0, e.target.nextSibling.innerHTML)
        setAmount(amount)
    }

    const updateDetails = (e) => setDetails(e.target.value)

    const updateCategory = (e) => {
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
                category = e.target.value
                break
            default:
                category = "others"
        }
        setCategory(category)
    }

    const updateTransactionDate = (e) => {
        let transactionDate = e.target.value
        e.target.nextSibling.innerHTML = checkInputEmpty(transactionDate)
        checkErrorStatusEmpty(1, e.target.nextSibling.innerHTML)
        setTransactionDate(transactionDate)
    }
    
    const clearForm = (e) => {
        setAmount("")
        setDetails("")
        for(let i = 0; i < document.getElementsByTagName("small").length; i++){
            document.getElementsByTagName("small")[i].innerHTML = ""
        }
        
        setTransactionDate(getTodayDate())
        setExpense(true)
        setInvalidFields([0, 0, 1])
    }

    return (
        <Main className="form" icon="money" title="Transactions" subtitle="Manage your Transactions">
            <div className="p-3 mt-3">
                <span className={`mx-auto my-5 ${submitStatus.className}`}>{submitStatus.message}&nbsp;</span>
                <form method="post" onSubmit={e=> submitForm(e)}>
                    <div className="form-group">
                        <label htmlFor="details">Details (Optional)</label>
                        <TextArea name="details" id="details" className="form-control" onChange={(e)=>updateDetails(e)} value={details} ></TextArea>
                        <small className="text-danger"></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category" className="form-control" onChange={(e)=>updateCategory(e)} value={category} >
                            <option value="others" defaultValue>Others</option>
                            <option value="food">Food</option>
                            <option value="shopping">Shopping</option>
                            <option value="housing">Housing</option>
                            <option value="transportation">Transportation</option>
                            <option value="vehicle">Vehicle</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="technology">Technology</option>
                            <option value="education">Education</option>
                            <option value="investments">Investments</option>
                            <option value="expenses">Expenses</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount ($)</label>
                        <Input type="text" name="amount" id="amount" className="form-control" value={amount} onChange={(e)=>updateAmount(e)} />
                        <small className="text-danger"></small>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <Input type="radio" name="transactionType" id="typeExpense" className="form-check-input" onChange={e => setExpense(true)} checked={expense}  />
                            <label className="form-check-label" htmlFor="typeExpense">Expense</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <Input type="radio" name="transactionType" id="typeIncome" className="form-check-input" onChange={e => setExpense(false)} checked={!expense}/>
                            <label className="form-check-label" htmlFor="typeIncome">Income</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="transactionDate">Date</label>
                        <Input type="date" name="transactionDate" id="transactionDate" className="form-control" value={transactionDate} onChange={(e)=>updateTransactionDate(e)} />
                        <small className="text-danger"></small>
                    </div>
                    <div className="form-group">
                        <Input type="reset" className="btn m-2" onClick={e=>clearForm()} value="Clear"/>
                        <Input type="submit" className="btn m-2" disabled={invalidFields.filter((field)=> field).length < 2} value="Submit"/>
                        <i id="loading" className="fa fa-spinner fa-spin" style={{visibility:"hidden"}}></i>
                    </div>
                </form>
            </div>
        </Main>
    )
} 

export default TransactionForm
    

