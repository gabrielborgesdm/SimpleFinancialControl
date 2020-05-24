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
        if(amount) amount = parseFloat(amount)
        if(this.getCountry() === "brazil"){
           return <CurrencyFormat placeholder="Amount of money spent" thousandSeparator="." value={amount}  decimalScale={2} decimalSeparator="," prefix={'R$ '} onValueChange={(values)=>onChangeFunction(values.value)} name="amount" id="amount" className="form-control"/>
        } else {
            return <CurrencyFormat placeholder="Amount of money spent" thousandSeparator="," value={amount}  decimalScale={2} decimalSeparator="." prefix={'$ '} onValueChange={(values)=>onChangeFunction(values.value)} name="amount" id="amount" className="form-control"/>
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
