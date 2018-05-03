var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.io.emit("socketToMe", {temp: res.io.clients});
    console.log(res.io.sockets.adapter.rooms);
    res.send(req.session.name);
});

module.exports = router;
