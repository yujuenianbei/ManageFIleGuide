// socketio.js
const jwt = require('jsonwebtoken')
var socket_io = require('socket.io');
var UUID = require('uuid-js');
const { searchSql } = require("../sql/init");
const $sql = require('../dao/endPortSqlMapping');
var socketio = {};
// 房间用户名单
var roomInfo = {};
var home = {};
var chatRoom = {};
// 已登录用户列表
var loginUserList = [];
//获取io
socketio.getSocketio = function (server) {
    var io = socket_io.listen(server);

    io.on('connection', function (socket) {
        var url = socket.request.headers.referer;
        var splited = url.split('qruid=');
        var roomID = splited[splited.length - 1];
        socket.on('join', function (data) {
            if (data.pageId === 1) {
                home = data.pageId;
                roomID = data.room
                if (!roomInfo[roomID]) {
                    roomInfo[roomID] = [];
                }
                roomInfo[roomID].push(home);
                socket.join(roomID);    // 二维码创建房间并加入
                // 通知房间内人员
                io.to(roomID).emit('sys', { main: true }, roomInfo[roomID]);
                console.log(home + '加入了' + roomID, roomInfo);
            } else {
                user = data.pageId;
                console.log(roomInfo, user)
                // 将用户昵称加入房间名单中
                // user 不存在且 home存在 再进行填加
                if (roomInfo[roomID].indexOf(user) === -1 && roomInfo[roomID].indexOf(1) !== -1) {
                    roomInfo[roomID].push(user);
                    // 加入房间
                    socket.join(roomID);
                    // 通知页面手机端已扫描
                    io.to(roomID).emit('sys', { phone: 1 }, roomInfo[roomID]);
                    console.log(user + ' 加入了 ' + roomID, roomInfo);
                } else if (roomInfo[roomID].indexOf(1) === -1) {
                    // 如果home关闭了 一起关闭手机端
                    socket.leave(roomID);
                    delete roomInfo[roomID]
                    socket.emit('disconnect');
                } else if (roomInfo[roomID].indexOf(user) !== -1 && roomInfo[roomID].indexOf(1) !== -1) {
                    // 用户刷新或者分享二维码后 将本会话在前端调用删除
                    io.to(roomID).emit('sys', { phone: 0 }, roomInfo[roomID]);
                }
            }
        });

        // 接收用户消息,发送相应的房间
        socket.on('message', function (msg) {
            console.log(roomID, msg)
            // 验证如果用户不在房间内则不给发送
            if (roomInfo[roomID].indexOf(user) === -1) {
                return false;
            } else {
                console.log(msg.userName, msg.password)
                searchSql($sql.queryEndUserByUserName, [msg.userName]).then((result) => {
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
                        io.to(roomID).emit('logstate', {
                            qrState: 3,
                            uid: result[0].uid,
                            state: 1,
                            token: token,
                            userName: result[0].userName
                        }, msg);
                    } else {
                        io.to(roomID).emit('logstate', {
                            qrState: 4,
                            uid: null,
                            state: 0,
                            token: null,
                            userName: ''
                        }, msg);
                    }
                    return res
                })
            }
        });

        // 用户列表
        socket.on('userList', function (msg) {
            if (msg.type === 'in') {
                if (loginUserList.indexOf(msg.userName) === -1) {
                    console.log(msg)
                    loginUserList.push(msg.userName)
                    io.emit("userList", {
                        userList: loginUserList
                    })
                }
            } else {
                if (loginUserList.indexOf(msg.userName) !== -1) {
                    var index = loginUserList.indexOf(msg.userName);
                    console.log(msg)
                    loginUserList.splice(index, 1)
                    io.emit("userList", {
                        userList: loginUserList
                    })
                }
            }
        })

        // 退出
        socket.on('leave', function (data) {
            if (data.pageId === 1) {
                const user = data.pageId;
                const roomID = data.room;
                // 从房间名单中移除  
                // 判断会话是否存在
                if (roomInfo[roomID]) {
                    var index = roomInfo[roomID].indexOf(user);
                    if (index !== -1) {
                        roomInfo[roomID].splice(index, 1);
                    }
                    // 退出房间
                    socket.leave(roomID);
                    // 删除聊天室id
                    delete roomInfo[roomID]
                    io.to(roomID).emit('sys', { main: false }, roomInfo[roomID]);
                    console.log(user + '退出了' + roomID, roomInfo);
                    socket.emit('disconnect');
                }
            } else {
                const user = data.pageId;
                // 从房间名单中移除
                var index = roomInfo[roomID].indexOf(user);
                if (index !== -1) {
                    roomInfo[roomID].splice(index, 1);
                }
                // 退出房间
                socket.leave(roomID);
                // 删除聊天室id
                delete roomInfo[roomID]
                io.to(roomID).emit('sys', user + '退出了房间', roomInfo[roomID]);
                console.log(user + '退出了' + roomID);
                socket.emit('disconnect');
            }
        });

        // 聊天室
        socket.on('chat', function (data) {
            // 发起端
            console.log(data)
            if (data.roomId === null) {
                var date = new Date().getTime();
                roomId = UUID.fromTime(date, true);
                io.emit('chat', { userNameMy: data.userNameMy, userNameClient: data.userNameClient, roomId, })
                // 写入用户列表
                if (!chatRoom[roomId]) {
                    chatRoom[roomId] = [];
                }
                chatRoom[roomId].push(data.userNameMy);
                // 创建房间并加入
                socket.join(roomId);
                // // 通知房间内人员
                // io.to(roomId).emit('chatMessage', { roomId }, chatRoom[roomID]);
                console.log([data.userNameMy] + '加入了' + chatRoom[roomId]);
            } else {
                // 写入用户列表
                if (!chatRoom[data.roomId]) {
                    chatRoom[data.roomId] = [];
                }
                chatRoom[data.roomId].push(data.userNameClient);
                // 创建房间并加入
                socket.join(data.roomId);
                // 通知房间内人员
                // io.to(data.roomId).emit('chatMessage', { roomId: data.roomId }, chatRoom[roomID]);
                console.log(chatRoom);
            }

        });

        socket.on('chatMessage', function (data) {
            console.log(data);
            io.to(data.roomId).emit('chatMsg', { name: data.name, message: data.message });
        })




        // 断开链接
        socket.on('disconnect', function (data) {
            console.log('disconnected');
        });






        // SockList.push(socket);
        // count++
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

        // socket.on('message', function (msg) {
        //     // 验证如果用户不在房间内则不给发送
        //     if (roomInfo[roomID].indexOf(user) === -1) {  
        //       return false;
        //     }
        //     socketIO.to(roomID).emit('msg', user, msg);
        //   });

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
        //             室rchSql($sql.updateEndUserLoginTime, [new Date(portDate), result[0].id])
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
        // socket.on('disconnect', function () {
        //     console.log('disconnected');
        // });
    });
};

module.exports = socketio;

// https://www.imooc.com/article/3453#