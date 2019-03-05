const mongoose = require('mongoose');

const Sals = mongoose.Schema({

    Product: String,
    QTY: Number,
    Price: Number,
    Total: Number,
    FirstName: String,
    LastName: String,
    Email: String,
    Phone: Number,
    Streetaddress: String,
    City: String,
    Country: String


}, {
    timespace: true,
});

module.exports = mongoose.model('Sales', Sals)