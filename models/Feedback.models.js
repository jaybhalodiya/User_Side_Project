const mongoose = require('mongoose')

const Fed = mongoose.Schema({
    UserName: String,
    EmailID: String,
    Date: Date,
    Message: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Feedback', Fed)