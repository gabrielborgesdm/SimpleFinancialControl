const {
    Schema,
    model
} = require('mongoose');

const TransactionSchema = new Schema({
    userId: { 
        type: String, 
        required: true 
    },

    amount: {
        type: Number,
        required: true
    },

    transactionType: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },

    details: { type: String },
    category: { type: String },
    
    transactionDate: {
        type: Date,
        required: true
    }

}, {
    timestamps: true
});

module.exports = model('Transaction', TransactionSchema);