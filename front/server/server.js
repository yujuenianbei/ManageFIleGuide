// // 引入http模块和fs模块
// var http=require('http')
// var fs=require('fs')

// // 创建一个本地服务器,127.0.0.1:3000
// http.createServer((req,res)=>{
//     var mp3='./src/static/trip.mp3'
//     var stat=fs.statSync(mp3)

//     res.writeHead(200,{
//         'Content-Type':'audio/mpeg',
//         'Content-Length':stat.size
//     })

//     //创建可读流
//     var readableStream=fs.createReadStream(mp3)
//     // 管道pipe流入
//     readableStream.pipe(res);
// }).listen(4000)
// console.log('服务器运行在 127.0.0.1:4000端口')



// //解析请求参数
// const params = URL.parse(req.url, true).query;
const express = require('express');
const bodyParser = require('body-parser');
const URL = require('url');
const app = express();
const fs = require('fs');
const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


//加载mysql模块
const mysql = require('mysql');
//创建连接
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '492275105',
    database: 'mysystem'
});

const addSql = 'INSERT INTO musicFile(songname,songauthor,songalbum,songalbumdate,songfile) VALUES(?,?,?,?,?)';


// 添加文件
app.post('/add', function (req, res) {
    // 输出 JSON 格式
    const response = {
        songname: req.body.songname,
        songauthor: req.body.songauthor,
        songalbum: req.body.songalbum,
        songalbumdate: req.body.songalbumdate,
        // songalbumimg: req.body.songalbumimg,
        songfile: req.body.songfile
    };
    console.log(req.body)
    const addSqlParams = [response.songname, response.songauthor, response.songalbum, response.songalbumdate, response.songfile];
    pool.query(addSql, addSqlParams, function (err, rows, fields) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send({
                reqCode: 500,
                reqData: {}
            })
            return;
        } else {
            res.send({
                reqCode: 200,
                reqData: {
                    songname: response.songname,
                    songauthor: response.songauthor,
                    songalbum: response.songalbum,
                    songalbumdate: response.songalbumdate,
                    // songalbumimg: response.songalbumimg,
                    songfile: response.songfile
                }
            });
        }
    });
})



// //只能以Form形式上传name为mFile的文件
// //var upload = multer({ dest: 'upload/'}).single('mFile');
// var upload = multer({
//     dest: 'upload/'
// }).any();
// app.get('/mm', function (req, res) {
//     console.log("--------访问根目录--------");
//     res.send('hello, express');
//     res.end();
// });

// app.get('/download', function (req, res) {
//     console.log("---------访问下载路径-------------");
//     var pathname = "/src/static/trip.mp3";
//     var realPath = pathname;
//     fs.exists(realPath, function (exists) {
//         if (!exists) {
//             console.log("文件不存在");
//             res.writeHead(404, {
//                 'Content-Type': 'text/plain'
//             });

//             res.write("This request URL " + pathname + " was not found on this server.");
//             res.end();
//         } else {
//             console.log("文件存在");
//             fs.readFile(realPath, "binary", function (err, file) {
//                 if (err) {
//                     res.writeHead(500, {
//                         'Content-Type': 'text/plain'
//                     });
//                     console.log("读取文件错误");
//                     res.end(err);
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/html'
//                     });
//                     console.log("读取文件完毕，正在发送......");

//                     res.write(file, "binary");

//                     res.end();
//                     console.log("文件发送完毕");
//                 }
//             });
//         }
//     });
// });

// app.post('/upload', function (req, res) {
//     console.log("---------访问上传路径-------------");

//     /** When using the "single"
//           data come in "req.file" regardless of the attribute "name". **/
//     upload(req, res, function (err) {
//         //添加错误处理
//         if (err) {
//             console.log(err);
//             return;
//         }
//         req.file = req.files[0];
//         var tmp_path = req.file.path;
//         console.log(tmp_path);

//         /** The original name of the uploaded file
//             stored in the variable "originalname". **/
//         var target_path = 'uploads/' + req.file.originalname;

//         /** A better way to copy the uploaded file. **/
//         console.log(target_path);


//         if (!fs.existsSync('uploads/')) {
//             fs.mkdirSync('uploads/');
//         }

//         var src = fs.createReadStream(tmp_path);
//         var dest = fs.createWriteStream(target_path);
//         src.pipe(dest);
//         src.on('end', function () {
//             res.end();
//         });
//         src.on('error', function (err) {

//             res.end();
//             console.log(err);
//         });

//     });
// });

var port = 3999;
var hostname = '127.0.0.1';
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});