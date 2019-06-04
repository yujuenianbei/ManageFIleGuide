var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var { query, initMysql, checkTables } = require('./sql/init');
var app = express();

// enable cors
var corsOptions = {
  origin: '*',
  credentials: true // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));

//设置跨域访问
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  //header头信息设置结束后，结束程序往下执行，返回
  if (req.method.toLocaleLowerCase() === 'options') {
    res.status(204);
    return res.json({});   //直接返回空数据，结束此次请求
  } else {
    next();
  }
};
app.use(allowCrossDomain);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 初始化数据库
initMysql();


// // 密钥
// const secret = 'ILOVENINGHAO'
// app.use(function (req, res, next) {
//   // 其他的多有请求都需要进行token校验 
//   // console.log(req.headers.login)
//   if (parseInt(req.headers.login) !== 0) {
//       let token = req.headers.authorization;
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


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//graphql
var graphqlHTTP = require('express-graphql');
var userSchema = require('./graphql/user/schema');

app.use('/graphql', graphqlHTTP({
  schema: userSchema,
  graphiql: true, //启用GraphiQL
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
