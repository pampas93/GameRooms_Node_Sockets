var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var users = require('./routes/users');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
io.clients = 0;

// io.on('connection', function(socket){

//   //console.log('Made socket connection '+socket.id);
//   io.clients++;

//   io.sockets.emit('newClient', {clients: io.clients});

//   socket.on('newRoom', function (data) {
//     socket.join(data.room);
//     console.log(io.sockets.adapter.rooms);
//   });

//   socket.on('disconnect', function () {
//     io.clients--;
//     //console.log('A user disconnected');
//     io.sockets.emit('newClient', {clients: io.clients});
//  });
// })


app.use(session({ 
  secret: 'this-is-a-secret-token',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: false }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', users);

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

module.exports = {app: app, server: server};
