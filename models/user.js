var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

var userSchema = mongoose.Schema({
    local: {
        First_Name: String,
        Last_Name: String,
        email: String,
        password: String,
    },
});

userSchema.methods.generateHash = function(password) {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
    return bcryptjs.compareSync(password, this.local.password);
};
module.exports = mongoose.model('UserLogin', userSchema);