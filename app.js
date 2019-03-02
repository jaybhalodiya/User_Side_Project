var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dbConfig = require('./database.config.js');
const mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var UserLogin = require('./models/user');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
mongoose.Promise = global.Promise;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(dbConfig.url).then(() => {
    console.log("connect sucess");
}).catch(() => {
    console.log("error");
});

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'shhsecret',
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
    console.log(req.session);
    res.locals.isLogin = false;
    if (req.session.passport) {
        if (req.session.passport.user) {
            UserLogin.findById(req.session.passport.user, function(err, user) {
                res.locals.user = user;
                res.locals.isLogin = true;
                next();

            })

        } else {
            res.locals.isLogin = false;
            next();


        }
    } else {
        res.locals.isLogin = false;
        next();

    }
    console.log("-*-*-*-*-*-*-*-", res.locals);


});

app.use('/', indexRouter);
app.use('/users', usersRouter);

require('./config/passport')(passport);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;