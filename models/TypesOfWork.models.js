const mongoose = require('mongoose');

const Typwrk = mongoose.Schema({

    Work_Name: String,


}, {
    timestamps: true,
});

module.exports = mongoose.model('TypesOfWork', Typwrk);