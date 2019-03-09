const mongoose = require('mongoose');

const AddTo = mongoose.Schema({
    product_id: String,
    Product_Name: String,
    QTY: Number,
    Price: Number,
    Image: String,
    user_id: String,
    total: Number
}, {
    timespace: true,
});

module.exports = mongoose.model('AddToCart', AddTo)