const mongoose = require('mongoose');

const Nw = mongoose.Schema({


    Email_ID: String

}, {
    timespace: true,
});

module.exports = mongoose.model('Newsletter Subscription', Nw);