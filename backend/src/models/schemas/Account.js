const {
    Schema,
    model
} = require('mongoose');

const AccountSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hash: { type: String, required: true },
    isActive: { type: Boolean, required: false, default: false },
}, {
    timestamps: true
}, {collection: 'webDashboard'});

module.exports = model('Account', AccountSchema);