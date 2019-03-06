const express = require('express');
const router = express.Router();
const path = require('path');
// redis
const session = require('express-session');
const redisStore = require('connect-redis')(session);



const mysql = require('mysql');
const fs = require('fs');
const { query } = require('../sql/init');
// 文件上传
const multer = require('multer');
// 导出csv
const csv = require('fast-csv');

// 不带时分秒
function date(time) {
  var date = new Date(time);
  var times = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
  return times;
}
// 带时分秒
function datetime(time) {
  var date = new Date(time);
  var times = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
  return times;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("获取到的session:" + req.session.user);
});

// // 清空数据库
// const truncatUser = 'TRUNCATE TABLE userList;'
// // 清空用户
// router.get('/truncatUser', function (req, res, next) {
//   pool.query(truncatUser, function (err, rows, fields) {
//     if (err) {
//       console.log('[SELECT ERROR] - ', err.message);
//       res.send({
//         reqCode: 500, reqData: {}
//       })
//       reutrn;
//     } else {
//       res.send({
//         reqCode: 200, reqData: '数据清空完毕'
//       });
//     }
//   });
// });

// // 清空数据库
// const truncatSong = 'TRUNCATE TABLE songList;'
// // 清空用户
// router.get('/truncatSong', function (req, res, next) {
//   pool.query(truncatSong, function (err, rows, fields) {
//     if (err) {
//       console.log('[SELECT ERROR] - ', err.message);
//       res.send({
//         reqCode: 500, reqData: {}
//       })
//       reutrn;
//     } else {
//       res.send({
//         reqCode: 200, reqData: '数据清空完毕'
//       });
//     }
//   });
// });

// // session
// router.use(session({
//   name: 'session-name', // 这里是cookie的name，默认是connect.sid
//   secret: 'name', // 建议使用 128 个字符的随机字符串
//   resave: true,
//   saveUninitialized: true,
//   cookie: { maxAge: 1 * 60 * 60 * 1000 }, //默认1小时
//   store: new redisStore({
//     host: '127.0.0.1',
//     port: '6379',
//     db: 2,
//     pass: '492275105',
//   })
// }));

// // session
// router.post('/session', function (req, res, next) {
//   if (req.session.isFirst || req.cookies.isFirst) {
//     req.session.isFirst++;
//     res.send({
//       reqCode: 200,
//       reqData: 'not first'
//     });
//   } else {
//     req.session.isFirst = 1;
//     res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true });
//     res.send({
//       reqCode: 200,
//       reqData: 'first'
//     });
//   }
//   console.log(req.session)
//   console.log("获取到的session:" + req.session.isFirst);
// });

// router.post('/session1', function (req, res, next) {
//   console.log(req.session)
//   res.send({
//     reqCode: 200,
//     reqData: 'first'
//   });
// });

// // 登录
// router.post('/userLogin', function (req, res) {
//   const loginSql = `SELECT user_name, user_password FROM userList where user_name=?`
//   const response = {
//     user_name: req.body.username,
//     user_password: req.body.password,
//   };
//   const loginParams = [response.user_name]
//   res.cookie('name', 1, { maxAge: 60 * 1000, singed: true });
//   console.log(req.sessionID)
//   query(loginSql, loginParams, function (err, rows, fields) {
//     if (err) {
//       console.log('[INSERT ERROR] - ', err.message);
//       res.send({
//         reqCode: 500,
//         reqData: 'ENT.500'
//       })
//       return;
//     } else {
//       console.log(rows, response.user_password)
//       if (rows.length > 0) {
//         if (response.user_password === rows[0].user_password) {
//           // 从数据库中比对账号验证是否成功，如成功保存用户信息
//           res.send({
//             reqsess: req.sessionID,
//             reqCode: 200,
//             reqKey: 1,
//             reqData: 'ENT.100',
//             userName: response.user_name
//           });
//         }
//       } else {
//         console.log(req.session)
//         res.send({
//           reqCode: 201,
//           reqData: 'ENT.101'
//         });
//       }
//     }
//   });
// })


// // 获取左侧菜单内容
// router.get('/leftList', (req, res) => {
//   const listSql = `SELECT id, list_type, list_name,list_link, list_parent_id FROM leftlist`
//   query(listSql, [], function (err, rows, fields) {
//     if (err) {
//       console.log('[SELECT ERROR] - ', err.message);
//       res.send({
//         reqCode: 500,
//         reqData: {}
//       })
//       return;
//     } else {
//       res.send({
//         reqCode: 200,
//         reqData: {
//           leftList: rows
//         }
//       });
//     }
//   });
// })

// // 获取用户列表
// router.get('/userList', function (req, res) {
//   console.log(req.session)
//   const addSql = `SELECT id, user_name, user_password, user_realname, user_birthday, user_id, create_time FROM userList`
//   query(addSql, [], function (err, rows, fields) {
//     if (err) {
//       console.log('[INSERT ERROR] - ', err.message);
//       res.send({
//         reqCode: 500,
//         reqData: {}
//       })
//       return;
//     } else {
//       const data = []
//       rows.forEach((item) => {
//         data.push({
//           id: item.id,
//           user_name: item.user_name,
//           user_password: item.user_password,
//           user_realname: item.user_realname,
//           user_birthday: date(item.user_birthday),
//           user_id: item.user_id,
//           create_time: datetime(item.create_time)
//         })
//       })
//       res.send({
//         reqCode: 200,
//         reqData: data
//       });
//     }
//   });
// })

// // 新增用户
// router.post('/userList', function (req, res) {
//   const response = {
//     user_name: req.body.username,
//     user_password: req.body.password,
//     user_realname: req.body.userrealname,
//     user_birthday: req.body.userbirthday,
//     user_id: req.body.userid
//   };
//   const addSql = `insert ignore userList(user_name, user_password, user_realname, user_birthday, user_id, create_time, update_time) values(?,?,?,?,?,NOW(),NOW())`
//   let addParams = [response.user_name, response.user_password, response.user_realname, response.user_birthday, response.user_id,]
//   query(addSql, addParams, function (err, rows, fields) {
//     if (err) {
//       console.log('[INSERT ERROR] - ', err.message);
//       res.send({
//         reqCode: 500,
//         reqData: {}
//       })
//       return;
//     } else {
//       res.send({
//         reqCode: 200,
//         reqData: {}
//       });
//     }
//   });
// })

// // 修改用户
// router.put('/userList', function (req, res) {
//   const response = {
//     id: req.body.id,
//     user_name: req.body.username,
//     user_password: req.body.password,
//     user_realname: req.body.userrealname,
//     user_birthday: req.body.userbirthday,
//     user_id: req.body.userid
//   };
//   const updateSql = `update ignore userList set user_name=?, user_password=?, user_realname=?, user_birthday=?, user_id=?, update_time=now() WHERE id = ${JSON.stringify(response.id)} `
//   let updateParams = [response.user_name, response.user_password, response.user_realname, response.user_birthday, response.user_id,]
//   query(updateSql, updateParams, function (err, rows, fields) {
//     if (err) {
//       console.log('[INSERT ERROR] - ', err.message);
//       res.send({
//         reqCode: 500,
//         reqData: {}
//       })
//       return;
//     } else {
//       res.send({
//         reqCode: 200,
//         reqData: {}
//       });
//     }
//   });
// })

// // 删除用户
// router.post('/userListDel', function (req, res) {
//   const response = {
//     id: req.body.id
//   };
//   console.log(req.body);
//   const delSql = `delete from userList where id =  ${JSON.stringify(response.id)}`
//   let delParams = [response.id]
//   query(delSql, delParams, function (err, rows, fields) {
//     if (err) {
//       console.log('[INSERT ERROR] - ', err.message);
//       res.send({
//         reqCode: 500,
//         reqData: {}
//       })
//       return;
//     } else {
//       res.send({
//         reqCode: 200,
//         reqData: {}
//       });
//     }
//   });
// })


// const child_process = require('child_process');
// // 导出用户数据
// router.post('/exportList', (req, res) => {
//   // 根据页面生成csv
//   const datatable = req.body.name;
//   let createCsvFile = new Promise((resolve, reject) => {
//     // // node创建csv
//     // let title = [];
//     // let data = [];
//     // let dataindex = 0;
//     // query(`select * from ${datatable}`, [], (error, results, fields) => {
//     //   results.forEach((currentValue, index, arr) => {
//     //     data.push(currentValue);
//     //     dataindex = index + 1;
//     //   })
//     //   // 创建数据流并生成文件
//     //   var csvStream = csv.createWriteStream({ headers: true }),
//     //     writableStream = fs.createWriteStream('./static/output/' + datatable + ".csv");
//     //   writableStream.on("finish", function () {
//     //     console.log("DONE!");
//     //   });
//     //   csvStream.pipe(writableStream);
//     //   // 将数据写入数据流中
//     //   data.forEach((currentValue, index, arr) => {
//     //     csvStream.write(currentValue);
//     //   });
//     //   csvStream.end();
//     // python创建csv
//     var workerProcess = child_process.spawn('python', ['./python/writeCsv.py', 0]);
//     workerProcess.on('close', function (code) {
//       console.log('子进程已退出，退出码 ' + code);
//       resolve(1);
//     });
//     // resolve(1);
//   });
//   // })
//   // 导出文件完成后传给前端
//   Promise.all([createCsvFile]).then((result) => {
//     res.setHeader('Content-fileName', datatable + '.csv');
//     res.setHeader('Content-type', 'application/octet-stream');
//     res.setHeader('Content-Disposition', 'attachment;filename=' + datatable + '.csv');    // 'aaa.txt' can be customized.
//     var fileStream = fs.createReadStream('./static/output/' + datatable + '.csv');
//     fileStream.on('data', function (data) {
//       res.write(data, 'binary');
//     });
//     fileStream.on('end', function () {
//       res.end();
//       console.log('The file has been downloaded successfully!');
//     });
//   }).catch((error) => {
//     console.log(error)
//   })
// })

// // // 下载文件
// // router.get('/exportUserList', (req, res) => {
// //   res.setHeader('Content-fileName', 'songlist.csv');

// //   res.setHeader('Content-type', 'application/octet-stream');
// //   res.setHeader('Content-Disposition', 'attachment;filename=songlist.csv');    // 'aaa.txt' can be customized.
// //   var fileStream = fs.createReadStream('./static/output/songlist.csv');
// //   fileStream.on('data', function (data) {
// //       res.write(data, 'binary');
// //   });
// //   fileStream.on('end', function () {
// //       res.end();
// //       console.log('The file has been downloaded successfully!');
// //   });

// //   // res.download('./static/output/songlist.csv');

// //   // //第二种方式
// //   // var path = './static/output/songlist.csv';
// //   // var f = fs.createReadStream(path);
// //   // res.writeHead(200, {
// //   //   'Content-Type': 'application/octet-stream',
// //   //   'Content-Disposition': 'attachment; filename=songlist.csv', //告诉浏览器这是一个需要下载的文件
// //   // });
// //   // f.pipe(res);

// //   // res.writeHead(200, {
// //   //   'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件  
// //   //   'Content-Disposition': 'attachment; filename=' + fileName, //告诉浏览器这是一个需要下载的文件  
// //   // });
// //   // fs.createReadStream(filePath).pipe(res);
// // })


// // 获取MP3列表
// router.get('/songList', function (req, res) {
//   const addSql = `SELECT song_id, song_name, author_name,album_name, song_img, song_url, album_data FROM songList`
//   query(addSql, [], function (err, rows, fields) {
//     if (err) {
//       console.log('[SELECT ERROR] - ', err.message);
//       res.send({
//         reqCode: 500,
//         reqData: {}
//       })
//       return;
//     } else {
//       res.send({
//         reqCode: 200,
//         reqData: {
//           songInfo: rows
//         }
//       });
//     }
//   });
// })

// // 上传MP3
// router.post('/songInfo', function (req, res) {
//   const response = {
//     song_id: new Date().getTime(),
//     song_name: req.body.songName,
//     author_name: req.body.authorName,
//     album_name: req.body.songAlbum,
//     song_img: req.body.songImg,
//     song_url: req.body.songUrl,
//     album_data: req.body.songAlbumdate
//   };
//   console.log(response);
//   const addSql = `insert ignore songList(song_id, song_name, author_name, album_name, song_img, song_url, album_data, create_time, update_time) values(?,?,?,?,?,?,?,NOW(),NOW())`
//   const addParams = [response.song_id, response.song_name, response.author_name, response.album_name, response.song_img, response.song_url, response.album_data]
//   query(addSql, addParams, function (err, rows, fields) {
//     if (err) {
//       console.log('[SELECT ERROR] - ', err.message);
//       res.send({
//         reqCode: 500,
//         reqData: {}
//       })
//       return;
//     } else {
//       res.send({
//         reqCode: 200,
//         reqData: {
//           songInfo: rows
//         }
//       });
//     }
//   });
// })

// // 修改mp3
// router.put('/songInfo', function (req, res) {
//   const response = {
//     song_id: req.body.songId,
//     song_name: req.body.songName,
//     author_name: req.body.authorName,
//     album_name: req.body.songAlbum,
//     song_img: req.body.songImg,
//     song_url: req.body.songUrl,
//     album_data: req.body.songAlbumdate
//   };
//   console.log(response);
//   const addSql = `update ignore songList set song_name=?, author_name=?, album_name=?, song_img=?, song_url=?, album_data=?, update_time=now() WHERE song_id = ${JSON.stringify(response.song_id)}`
//   const addParams = [response.song_name, response.author_name, response.album_name, response.song_img, response.song_url, response.album_data]
//   query(addSql, addParams, function (err, rows, fields) {
//     if (err) {
//       console.log('[UPDATE ERROR] - ', err.message);
//       res.send({
//         reqCode: 500,
//         reqData: {}
//       })
//       return;
//     } else {
//       res.send({
//         reqCode: 200,
//         reqData: {
//           songInfo: rows
//         }
//       });
//     }
//   });
// })

// // 删除MP3
// router.post('/songInfoDelete', function (req, res) {
//   const response = {
//     song_id: req.body.songId,
//     song_name: req.body.songName,
//     author_name: req.body.authorName,
//     album_name: req.body.songAlbum,
//     song_img: req.body.songImg,
//     song_url: req.body.songUrl,
//     album_data: req.body.songAlbumdate
//   };
//   console.log(response);
//   // 先删除文件后删表里面的内容
//   console.log('准备删除文件');
//   let p1 = new Promise((resolve, reject) => {
//     fs.unlink('./static/img/' + response.song_img, function (err) {
//       if (err) return console.log(err);
//       console.log('图片删除成功');
//       resolve('1');
//     })
//   })

//   let p2 = new Promise((resolve, reject) => {
//     fs.unlink('./static/music/' + response.song_url, function (err) {
//       if (err) return console.log(err);
//       console.log('歌曲删除成功');
//       resolve('2');
//     })
//   })
//   Promise.all([p1, p2]).then((result) => {
//     const delSql = `delete from songList WHERE song_id = ${JSON.stringify(response.song_id)}`
//     const delParams = [response.song_id]
//     query(delSql, delParams, function (err, rows, fields) {
//       if (err) {
//         console.log('[UPDATE ERROR] - ', err.message);
//         res.send({
//           reqCode: 500,
//           reqData: {}
//         })
//         return;
//       } else {
//         res.send({
//           reqCode: 200,
//           reqData: {
//             songInfo: rows
//           }
//         });
//       }
//     });
//   }).catch((error) => {
//     console.log(error)
//   })
// })

// // 上传文件
// router.post('/profile', function (req, res) {
//   const storage = multer.diskStorage({
//     //设置上传后文件路径，uploads文件夹会自动创建。
//     destination: function (req, file, cb) {
//       const fileFormat = (file.originalname).split(".");
//       const fileType = fileFormat[fileFormat.length - 1]
//       if (fileType === 'mp4') {
//         cb(null, './static/veido')
//       }
//       if (fileType === 'mp3') {
//         cb(null, './static/music')
//       }
//       if (fileType === 'jpg') {
//         cb(null, './static/img')
//       }
//     },
//     //给上传文件重命名，获取添加后缀名
//     filename: function (req, file, cb) {
//       var fileFormat = (file.originalname).split(".");
//       cb(null, file.originalname.split('.')[0] + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
//     }
//   });
//   // 设置路径和文件名
//   var uploading = multer({
//     storage: storage
//   });
//   // 制定上传文件name
//   var upload = uploading.single('file');

//   upload(req, res, function (err) {
//     //添加错误处理
//     if (err) {
//       return console.log(err);
//     }
//     //文件信息在req.file或者req.files中显示。
//     console.log(req.file);
//     res.send({
//       reqCode: 200,
//       reqData: req.file.filename,
//       reqMimetype: req.file.mimetype
//     })
//   });
// });

// // 获取导出文件
// router.get('/output/:name/', function (req, res, next) {
//   const outputName = req.params.name;
//   res.sendFile(path.resolve('./static/output/' + outputName));
// })
// // 获取mp3
// router.get('/music/:name/', function (req, res, next) {
//   const imgName = req.params.name;
//   res.sendFile(path.resolve('./static/music/' + imgName));
// })
// // 获取图片
// router.get('/img/:name/', function (req, res, next) {
//   const imgName = req.params.name;
//   res.sendFile(path.resolve('./static/img/' + imgName));
// })
// // 获取视频
// router.get('/video/:name/', function (req, res, next) {
//   const imgName = req.params.name;
//   res.sendFile(path.resolve('./static/video/' + imgName));
// })

// // 播放视频流
// router.get('/video', function (req, res, next) {
//   let path = './static/video/watcher.mp4';
//   let stat = fs.statSync(path);
//   let fileSize = stat.size;
//   let range = req.headers.range;
//   // fileSize 3332038
//   if (range) {
//     //有range头才使用206状态码
//     let parts = range.replace(/bytes=/, "").split("-");
//     let start = parseInt(parts[0], 10);
//     let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

//     // end 在最后取值为 fileSize - 1 
//     end = end > fileSize - 1 ? fileSize - 1 : end;

//     let chunksize = (end - start) + 1;
//     let file = fs.createReadStream(path, { start, end });
//     let head = {
//       'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': chunksize,
//       'Content-Type': 'video/mp4',
//     };
//     res.writeHead(206, head);
//     file.pipe(res);
//   } else {
//     let head = {
//       'Content-Length': fileSize,
//       'Content-Type': 'video/mp4',
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(path).pipe(res);
//   }
// });

// router.get('/python', function (req, res, next) {
//   // 运行python
//   var workerProcess = child_process.spawn('python', ['./python/writeCsv.py', 0]);
//   workerProcess.on('close', function (code) {
//     console.log('子进程已退出，退出码 ' + code);
//   });
//   // var workerProcess = child_process.exec('python ./python/writeCsv.py'+i, function (error, stdout, stderr) {
//   //   if (error) {
//   //     console.log(error.stack);
//   //     console.log('Error code: ' + error.code);
//   //     console.log('Signal received: ' + error.signal);
//   //   }
//   //   console.log('stdout: ' + stdout);
//   //   console.log('stderr: ' + stderr);
//   // });

//   // workerProcess.on('exit', function (code) {
//   //   console.log('子进程已退出，退出码 ' + code);
//   // })

//   res.send({
//     reqCode: 200
//   })
// })



module.exports = router;
