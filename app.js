var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var thechob = require('./routes/thechob');
var chats = require('./routes/chats');
var chuckleschat = require('./routes/chuckleschat');
var book = require('./routes/book');
var brain = require('./routes/brain');
var brain_input = require('./routes/brain_input');
var highfreaktosepower = require('./routes/highfreaktosepower');
var chuckles = require('./routes/chuckles');
var GetRandomChat = require('./routes/GetRandomChat');
var poke = require('./routes/poke');

global.poke = false;

var app = express();
var exphbs  = require('express-handlebars');

var hbs = exphbs.create({
    defaultLayout: 'main',
    //helpers      : { dateFormat },
    extname: '.hbs',


    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    partialsDir: [
        'views/partials/'
    ]
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/chuckleschat', chuckleschat);
app.use('/chats', chats);
app.use('/thechob', thechob);
app.use('/book', book);
app.use('/brain', brain);
app.use('/brain_input', brain_input);
app.use('/highfreaktosepower', highfreaktosepower);
app.use('/chuckles', chuckles );
app.use('/getrandomchat', GetRandomChat);
app.use('/poke', poke);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
