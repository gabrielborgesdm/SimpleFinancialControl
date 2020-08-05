import { getUser } from "../helpers/StorageHelpers"

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