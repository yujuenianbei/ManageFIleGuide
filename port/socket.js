// socketio.js
var socketio = {};
var socket_io = require('socket.io');

var usocket = [];
//获取io
socketio.getSocketio = function(server){
  var io = socket_io.listen(server);

  // 聊天室 
  // 从http://socket.io/get-started/chat/上寻求更多帮助
  io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on("join", function (name) {
      usocket[name] = socket
      io.emit("join", name)
      console.log(name)
    })
  
    socket.on("message", function (msg) {
      io.emit("message", msg) //将新消息广播出去
      console.log(msg.name,msg.message);
    })
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
};

module.exports = socketio;
