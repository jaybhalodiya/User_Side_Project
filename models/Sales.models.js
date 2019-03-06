const mongoose = require('mongoose');

const Sals = mongoose.Schema({

    Product: String,
    QTY: Number,
    Price: Number,
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
    status: String


}, {
    timespace: true,
});

module.exports = mongoose.model('Sales', Sals)