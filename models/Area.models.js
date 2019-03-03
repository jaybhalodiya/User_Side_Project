const mongoose = require('mongoose');

const Ara = mongoose.Schema({
    Area_Name: String,
    City_Name: String,
    Pincode: Number

}, {
    timestamps: true,
});

module.exports = mongoose.model('Area', Ara);