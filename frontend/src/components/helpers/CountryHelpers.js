import React, { Component } from "react"
import CurrencyFormat from 'react-currency-format'

export default class CountryHelpers extends Component{
    static getCountry = () => localStorage.getItem("country") || null

    static getStringMasked = (value) => {
        if(this.getCountry() === "brazil"){
            value = value.toFixed(2)
            value = value.replace(".",",");
            value = `R$ ${value}`
        } else {
            value = value.toFixed(2)
            value = `$ ${value}`
        }
        return value
    }

    static getFormatedDate = (date) => {
        date = new Date(date).toISOString().split('T')[0] 
        if(this.getCountry() === "brazil"){
            date = date.split("-")
            date = `${date[2]}/${date[1]}/${date[0]}`
        } 
        return date
    }


    static getCoinSign = () => {
        let coin = "$"
        switch (this.getCountry()){
            case "brazil":
                coin = "R$"
                    break
            default: 
                coin = "$"
                break
        }
        return coin
    }

    static floorFigure(figure, decimals){
        if (!decimals) decimals = 2;
        var d = Math.pow(10,decimals);
        return (parseInt(figure*d)/d).toFixed(decimals);
    }

    static unmaskCoin = (value) => {
        value = value.replace(".", "")
        value = value.replace(/^\s+|\s+$/mg, '')
        value = value.replace(",", ".")
       
        return value
    }

    static getCoinInput = (onChangeFunction, amount = null) => {
        if(this.getCountry() === "brazil"){
           return <CurrencyFormat placeholder="Amount of money spent" thousandSeparator="." value={amount}  decimalScale={2} decimalSeparator="," prefix={'R$ '} onValueChange={(values)=>onChangeFunction(values.formattedValue)} name="amount" id="amount" className="form-control"/>
        } else {
            return <CurrencyFormat placeholder="Amount of money spent" thousandSeparator="," value={amount}  decimalScale={2} decimalSeparator="." prefix={'$ '} onValueChange={(values)=>onChangeFunction(values.formattedValue)} name="amount" id="amount" className="form-control"/>
        }
    }

    static getFormattedCoinText = (amount) => {
        amount = parseFloat(amount)
        let currency
        if(this.getCountry() === "brazil"){
            currency = <CurrencyFormat displayType="text" value={amount} thousandSeparator="." decimalScale={2} decimalSeparator="," prefix={'R$ '}/>
        } else {
            currency = <CurrencyFormat displayType="text" value={amount} thousandSeparator="," decimalScale={2} decimalSeparator="." prefix={'$ '}/>
        }
        return currency
    }
}
