var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var express = require('express');

app.set('view engine', 'ejs');
app.use(express.static(path.resolve('./public')));

//Routes
app.get('/', function (req, res) {
    res.render('index', {});
    //res.send('<h1>Hello world</h1>');
});

var user_count = 0;

//Socket connections
io.on('connection', function (socket) {
    console.log('a user connected');
    user_count++;

    io.on('disconnet', function(socket){
        user_count--;
        console.log('user disconnected');
    })
});


//Server setup
http.listen(3000, function () {
    console.log('listening on *:3000');
});