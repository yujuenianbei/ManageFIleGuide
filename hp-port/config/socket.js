// socketio.js
const jwt = require('jsonwebtoken')
var socket_io = require('socket.io');
const { searchSql } = require("../sql/init");
const $sql = require('../dao/endPortSqlMapping');
var socketio = {};
var usocket = [];
//获取io
socketio.getSocketio = function (server) {
    var io = socket_io.listen(server);

    // 聊天室 
    // 从http://socket.io/get-started/chat/上寻求更多帮助
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on("join", function (name) {
            usocket[name] = socket
            io.emit("join", name)
            console.log(name)
        })
        socket.on("scanned", function (msg) {
            io.emit("scanned", {
                qrState: 2
            })
        })

        socket.on('loginMessage', function (msg) {
            console.log(msg)
            searchSql($sql.queryEndUserByUserName, [msg.userName]).then((result)=>{
                let res = {};
                if (msg.password === result[0].password) {
                    // 更新用户最后登录时间
                    const curTime = new Date();
                    let portDate = curTime.setHours(curTime.getHours() + 8);
                    searchSql($sql.updateEndUserLoginTime, [new Date(portDate), result[0].id])
                    // 密钥
                    const secret = 'ILOVENINGHAO'
                    const payload = {
                        name: result[0].uid,
                        admin: true
                    }
                    const token = jwt.sign(payload, secret, { expiresIn: '1day' })
                    io.emit("loginMessage", {
                        qrState: 3,
                        uid: result[0].uid,
                        state: 1,
                        token: token,
                        userName: result[0].userName
                    })
                } else {
                    io.emit("loginMessage", {
                        qrState: 4,
                        uid: null,
                        state: 0,
                        token: null,
                        userName: ''
                    })
                }
                return res
              })
        })
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
};

module.exports = socketio;