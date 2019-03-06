const mongoose = require('mongoose');

const AddTo = mongoose.Schema({

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