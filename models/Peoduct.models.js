const mongoose = require('mongoose');

const Prod = mongoose.Schema({
    Product_Name: String,
    Price: Number,
    Description: String,
    QTY: Number,
    Category_Name: String,
    Brand_Name: String,
    Size: String,
    Color_Name: String,
    Offer: String,
    Image: String



}, {
    timestamps: true,
});

module.exports = mongoose.model('ProductALL', Prod);