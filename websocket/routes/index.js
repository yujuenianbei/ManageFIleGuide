var express = require('express');
var router = express.Router();
var http = require('http');
var io = require('socket.io')(http);

/* GET home page. */
router.get('/', function(req, res, next) {
  io.on('connection', function(socket){
    console.log('a user connected');
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
