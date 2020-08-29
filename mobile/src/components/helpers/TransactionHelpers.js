export const abstractObjectFromTransactionsQuery = (query) => {
    let transactions = []
    Object.values(query).forEach((queryElement, index)=>{
        let {_id, amount, category, details, transactionType, transactionDate} = queryElement
        transactionDate = new Date(transactionDate).toISOString().split('T')[0] 
        let transaction = {order: index + 1, _id, amount, category, details, transactionType, transactionDate}
        transactions.push(transaction)
    })
    return transactions
}