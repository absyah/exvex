var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var methodOverride  = require('method-override')
var passport        = require('passport')
var flash           = require('connect-flash')
var session         = require('express-session')
var configDB        = require('./config/database')

var app             = express();

// mongoDB configuration
mongoose.connect(configDB.url, function(err, res){
    if(err){
      console.log('error connecting to database, ' + err);
    }else{
      console.log('connecting to database');
    }
});

// mounth passport
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));


// Passport configuration
app.use(session({ secret: 'exvexnodejs', saveUninitialized: true, resave: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// Add routes
index   = require('./routes/index')(app, passport);
session = require('./routes/session')(app, passport);
user    = require('./routes/user')(app, passport);
article = require('./routes/article')(app, passport);

// Start server
app.listen('8080', function(){
    console.log("I'm listening on port 8080");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
