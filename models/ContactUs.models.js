const mongoose = require('mongoose');

const Cont = mongoose.Schema({

    Your_Name: String,
    Email_ID: String,
    Subject: String,
    Your_Message: String
}, {
    timespace: true,
});

module.exports = mongoose.model('Contact Us', Cont)