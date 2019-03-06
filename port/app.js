var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
// var redisStore = require('connect-redis')(session);

const jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var apisRouter = require('./routes/api');
var frontRouter = require('./routes/front');


var { query,initMysql, checkTables } = require('./sql/init');
var main = require('./sql/search');

var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 初始化数据库
initMysql();
// 验证数据库初始化完成，并执行导入数据操作
checkTables(query);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('name'));
app.use(express.static(path.join(__dirname, 'static')));
// 设置cookie
// session
// app.use(session({
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

// // 密钥
// const secret = 'ILOVENINGHAO'
// app.use(function (req, res, next) {
//   // 其他的多有请求都需要进行token校验 
//   if (req.url !== '/api/userLogin' && req.url.split('/')[2] !== 'output' && req.url.split('/')[2] !== 'video' && req.url.split('/')[1] !== 'video' && req.url.split('/')[2] !== 'img' && req.url.split('/')[2] !== 'music') {
//       let token = req.headers.token;
//       jwt.verify(token, secret, (error, decoded) => {
//         if (error) {
//           res.send({
//             reqCode: 500,
//             reqData: 'ENT.201'
//           })
//           return
//         }
//         next()
//       })
//   } else {
//       next();
//   }
// });

app.use('static',express.static(path.join(__dirname,'static')));
app.use('/', indexRouter);
app.use('/api', apisRouter);
app.use('/front', frontRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
