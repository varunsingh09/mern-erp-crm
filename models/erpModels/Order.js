const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const orderSchema = new mongoose.Schema({
    enabled: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: String,
        trim: true,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);
