// socketio.js
const jwt = require('jsonwebtoken')
var socket_io = require('socket.io');
const { searchSql } = require("../sql/init");
const $sql = require('../dao/endPortSqlMapping');
var socketio = {};
var roomUser = [];

let SockList = [];

let count = 0;
//获取io
socketio.getSocketio = function (server) {
    var io = socket_io.listen(server);

    io.on('connection', function (socket) {
        SockList.push(socket);
        count++
        // socket.on("join", function (name) {
        //     usocket[name] = socket
        //     io.emit("join", name)
        //     console.log(usocket)
        // })
        // // 校验用户
        // socket.on("verfiyUser", function (msg) {
        //     console.log(msg);
        //     console.log(usocket.indexOf(msg.wsId));
        //     if (usocket.indexOf(msg.wsId) !== -1) {
        //         io.emit("verfiyUser", {
        //             urlState: true
        //         })
        //     } else {
        //         io.emit("verfiyUser", {
        //             urlState: false
        //         })
        //     }
        // })
        // 用户扫码状态
        socket.on("scanned", function (msg) {
            // usocket.push(socket.id)
            SockList.forEach(item => {
                if (item === socket) {
                    io.emit("scanned", {
                        wsId: socket.id,
                        qrState: 2,
                        socketLength: SockList.length
                    })
                }
            });
        })

        socket.on('join', function(msg){
            let roomid = msg.id.hex;
            let userid = msg.aid.hex
            if (!roomUser[msg.id.hex]) {
                roomUser[msg.id.hex] = [];
            }
            roomUser[roomid].push(userid)
            socket.join(roomid);
            socket.to(roomid).emit('sys', userid + '加入了房间');
            // socket.emit('sys',user + '加入了房间');
            socket.emit('join',{
                id: msg.id.hex,
            })
            console.log(roomid, userid, count, roomUser)
        })

        // socket.on('ready', function (roomId, data) {
        //     pub.publish(roomId, JSON.stringify({
        //         "event": 'ready',
        //         "data": '',
        //         "namespace": '/user'
        //     }))
        // })

        // socket.on('button-start', function (id) {
        //     pub.publish(id, JSON.stringify({
        //         "event": 'button-start',
        //         "data": '',
        //         "namespace": '/user'
        //     }));
        // })

        // //针对namespace发送消息
        // io.of(namespace).emit('message', message)

        // 校验登录
        // socket.on('loginMessage', function (msg) {
        //     console.log(msg)
        //     searchSql($sql.queryEndUserByUserName, [msg.userName]).then((result) => {
        //         let res = {};
        //         if (msg.password === result[0].password) {
        //             // 更新用户最后登录时间
        //             const curTime = new Date();
        //             let portDate = curTime.setHours(curTime.getHours() + 8);
        //             searchSql($sql.updateEndUserLoginTime, [new Date(portDate), result[0].id])
        //             // 密钥
        //             const secret = 'ILOVENINGHAO'
        //             const payload = {
        //                 name: result[0].uid,
        //                 admin: true
        //             }
        //             const token = jwt.sign(payload, secret, { expiresIn: '1day' })
        //             io.emit("loginMessage", {
        //                 qrState: 3,
        //                 uid: result[0].uid,
        //                 state: 1,
        //                 token: token,
        //                 userName: result[0].userName
        //             })
        //         } else {
        //             io.emit("loginMessage", {
        //                 qrState: 4,
        //                 uid: null,
        //                 state: 0,
        //                 token: null,
        //                 userName: ''
        //             })
        //         }
        //         return res
        //     })
        // })
        socket.on('disconnect', function () {
            count--
            console.log('disconnected');
        });
    });
};

module.exports = socketio;

// https://www.imooc.com/article/3453#