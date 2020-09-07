import { getFormatedDate, getMaskedCoin } from "../helpers/LocationHelpers"
import { getCategory } from "../helpers/CategoryHelpers"
import { translate } from "../helpers/TranslationHelpers"

export const getFormattedTransactions = async (transactions) => {
    let newTransactions = []
    let index = 0
    
    for(let i = 0; i < transactions.length; i++){
        let transaction = transactions[`${i}`]
        
        let {_id, amount, category, details, transactionType, transactionDate} = transaction
        
        
        let formattedTransaction = {
            order: i + 1, 
            _id, 
            amount, 
            amountMasked: await getMaskedCoin(amount), 
            categoryIcon: getCategory(category).icon, 
            categoryTranslated: getCategory(category).category, 
            categoryKey: category,
            details: details || translate('TRANSACTIONS_LIST_NO_DESCRIPTION'), 
            transactionType,
            transactionTypeTranslated: transactionType === "income" ? translate('TRANSACTIONS_LIST_INCOME') : translate('TRANSACTIONS_LIST_EXPENSE'), 
            transactionDate: transactionDate,
            transactionDateFormatted: await getFormatedDate(transactionDate)
        }
        
        newTransactions.push(formattedTransaction)
    }

    return newTransactions
}
