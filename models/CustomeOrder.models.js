const mongoose = require('mongoose');

const Custom = mongoose.Schema({

    UserName: String,
    Measurements: String,
    EmailID: String,
    Phone: Number,
    Message: String,
    Image: String,
    Work_Name: String,
    Size: String,
    City_Name: String,
    Area_Name: String,
    status: String

}, {
    timespace: true,
});

module.exports = mongoose.model('Custome Order', Custom)