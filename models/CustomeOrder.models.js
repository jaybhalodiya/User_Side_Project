const mongoose = require('mongoose');

const Custom = mongoose.Schema({

    Your_Name: String,
    Phone_Number: Number,
    Email_ID: String,
    City: String,
    Image: String,
    Your_Message: String,
}, {
    timespace: true,
});

module.exports = mongoose.model('Custome Order', Custom)