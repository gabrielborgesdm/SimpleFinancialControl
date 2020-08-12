import { getUser } from "../helpers/StorageHelpers"
import { getDisplayLanguage } from "./TranslationHelpers"

export const getMaskedCoin = async (amount) => {
    
    amount = parseFloat(amount)

    let country = await getUser().coutry
    let currency

    if(country === "brazil"){
        amount = amount.toFixed(2)
        amount = amount.replace(".",",");
        amount = `R$ ${amount}`
    } else {
        amount = amount.toFixed(2)
        amount = `$ ${amount}`
    }
    return amount
}

export const getUnMaskedCoin = (amount) => {
    if(amount == 0) return 0
    
    amount = amount.replace(".", "")
    amount = amount.replace(/^\s+|\s+$/mg, '')
    amount = amount.replace(",", ".")
   
    return amount
}

export const getFormatedDate = async (date) => {
    let country = await getUser().coutry
    if(country === "brazil"){
        date = new Date(date).toLocaleDateString().split('T')[0] 
    } else {
        date = new Date(date).toISOString().split('T')[0] 
    }
    return date
}