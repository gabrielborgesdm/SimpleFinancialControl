import React, { useState, useEffect } from "react"
import Input from "../template/Input"

export default (props) => {
    const { submitForm, updateFields } = props
    const [transaction, setTransaction] = useState(props.transaction)

    useEffect(() => {
        setTransaction(props.transaction)
    }, [props])

    return (
        <div className="form">
            <form method="post" onSubmit={e=> submitForm(e)}>
                <div className="form-group">
                    <label htmlFor="amount">Amount($)</label>
                    <Input type="number" name="amount" className="form-control" value={transaction.amount} onChange={(e)=>updateFields(e)} required="required"/>
                    <small className="text-danger"></small>
                </div>
                <div className="form-group">
                    <label htmlFor="details">Details</label>
                    <Input type="text" name="details" className="form-control" value={transaction.details} onChange={(e)=>updateFields(e)} required="required"/>
                    <small className="text-danger"></small>
                </div>
                
                <div className="form-group">
                    <label htmlFor="transactionDate">Date</label>
                    <Input type="date" name="transactionDate" className="form-control" value={transaction.transactionDate} onChange={(e)=>updateFields(e)} required="required" />
                    <small className="text-danger"></small>
                </div>
                <div className="form-group">
                    <Input type="submit" className="btn btn-primary" value="Submit"/>
                    <Input type="reset" className="btn btn-danger" value="Clear"/>
                </div>
            </form>
        </div>
    )
} 
    

