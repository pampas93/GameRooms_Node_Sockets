var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  
  // //console.log(req.session.name);

  res.io.on('connection', function (socket) {

    
    // socket.on('newRoom', function (data) {
    //   socket.join(data.room);
    //   console.log(res.io.sockets.adapter.rooms);
    // });

  });

  res.render('index', {});
});

router.get('/:id', function (req, res, next) {

  //console.log(req.params.id);
  var room_name = req.params.id;
  res.io.on('connection', function (socket) {

    socket.join(room_name);
    socket.broadcast.emit('rooms', { rooms: res.io.sockets.adapter.rooms });

  });
  res.render('test', {});
  //req.params.id;
})

router.post('/NewRoom', function (req, res, next) {
  var r = req.body.roomName;
  res.redirect('/' + r);
});

router.post('/', function (req, res, next) {
  req.session.name = req.body.name;
  res.redirect('/');
});

module.exports = router;
