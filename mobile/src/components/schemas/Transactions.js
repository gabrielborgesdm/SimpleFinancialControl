
export const TransactionSchema =  [
    {
        name: 'Transaction', 
        properties: {
            _id: 'string',
            amount: "float",
            category: "string",
            details: {type: 'string', optional: true},
            transactionDate: "string",
            transactionType: "string",
            userId: "string"
        }
    }
]