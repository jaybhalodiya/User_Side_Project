const mongoose = require('mongoose');

const Siz = mongoose.Schema({
    Size: String,

}, {
    timestamps: true,
});

module.exports = mongoose.model('Size', Siz);