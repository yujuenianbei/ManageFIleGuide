/**
 * socket.io
 * 实现简单的打开浏览器/关闭浏览器记录信息
 */
var http = require('http'), // 加载http模块
    fs = require('fs'), // 加载fs模块
    count = 0; // 计数
// 创建web服务器
var server = http.createServer(function (req, res) {
    // 读取index.html
    fs.readFile('./index.html', function(error, data) {
        // 发送头信息
        res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
        // 输出index.html的内容到客户端
        res.end(data, 'utf-8');
    });
}).listen(8880); // 运行在3000端口上
// 打印运行日志信息
console.log('Server running!');
// 加载socket.io模块，绑定到已经创建的server
var ios = require('socket.io').listen(server);
// 监听 connection 事件
ios.sockets.on('connection', function(socket) {
    console.log("用户登录了");
    // 用户打开连接 count++
    count++;
    // 打开新的连接显示的内容
    socket.emit('users', {number: count});
    // 显示数据到已经打开的连接上
    socket.broadcast.emit('users', {number: count});
    // 监听 disconnection 事件
    socket.on('disconnect', function() {
        //用户关闭count--
        count--;
        console.log("用户退出了");
        // 显示数据到已经打开的连接上
        socket.broadcast.emit('users', {number: count});
    })
});