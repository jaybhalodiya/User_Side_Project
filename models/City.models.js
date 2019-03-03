const mongoose = require('mongoose');

const cty = mongoose.Schema({

    City_Name: String,
    State_Name: String

}, {
    timestamps: true,
});

module.exports = mongoose.model('City', cty);