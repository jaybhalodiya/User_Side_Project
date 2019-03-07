const mongoose = require('mongoose');

const Sals = mongoose.Schema({

    Product: String,
    QTY: Number,
    Price: Number,
    Image: String,
    total: Number,
    first_name: String,
    last_name: String,
    email: String,
    phone: Number,
    street_address: String,
    city: String,
    zip: Number,
    country: String,
    state: String,
    status: String,
    user_id: String
}, {
    timespace: true,
});

module.exports = mongoose.model('Sales', Sals)