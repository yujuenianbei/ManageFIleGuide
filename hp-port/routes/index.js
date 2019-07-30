var express = require('express');
var router = express.Router();
var http = require('../config/http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var UUID = require('uuid-js');
var url = require('url');
var qrImg = require('qr-image');
// 文件上传
const multer = require('multer');

var $sql = require('../dao/userSqlMapping');
var { searchSql } = require("../sql/init")


/* GET home page. */
router.get('/scanned', function(req, res, next) {
  res.render('index', { title: '扫码登录', uid: req.query.uid, http: http.port });
});


let uid;
//生成二维码
router.get('/loginByPhone', function (req, res) {
  // 生成唯一的ID
  uid = UUID.create();
  try {
    if (typeof(uid) !== "undefined"){
      // 写入二维码内的网址，微信扫描后自动跳转
      let jumpURL = http.ip + "/scanned?uid=" + uid;
      // 生成二维码(size：图片大小， margin: 边框留白)
      var img = qrImg.image(jumpURL, {size :6, margin: 2});
      res.writeHead(200, {'Content-Type': 'image/png'});
      img.pipe(res);
    }
    else{
      res.writeHead(414, {'Content-Type': 'text/html'});
      res.end('<h1>414 Request-URI Too Large</h1>');
    }
  } catch (e) {
    res.writeHead(414, {'Content-Type': 'text/html'});
    res.end('<h1>414 Request-URI Too Large</h1>');
  }
});

router.get('/loadUid', function (req, res) {
  console.log(""+uid+"")
  res.send({
    reqUid: uid,
  });
});

//判断用户是否已扫描
router.post('/scanner', function (req, res) {
  var uid = req.body.uid;
  var state = 2;
  searchSql($sql.inserUidQr, [uid, null, state]).then((result)=>{
    console.log(result)
    if(result){
      res.send({
        reqCode: 200,
      });
    } else {
      res.send({
        reqCode: 500
      });
    }
  })
});


//判断用户是否已扫描
router.post('/verify', function (req, res) {
  var uid = req.body.uid;
  searchSql($sql.searchUidState, [uid]).then((result)=>{
    console.log(result, req.body)
    if(result.length > 0){
      if(result[0].state === 3){
        searchSql($sql.queryUserUid, [uid]).then((results)=>{
          res.send({
            reqCode: 200,
            uid: result[0].uid,
            uuid: result[0].uuid,
            state: result[0].state
          });
        })
      } else {
        res.send({
          reqCode: 200,
          state: result[0].state
        });
      }
    } else {
      res.send({
        reqCode: 201,
        state: 1
      });
    }
  })
});

//用户登录
router.post('/confirm', function (req, res) {
  var uid = req.body.uid;
  var uuid = req.body.uuid;
  var operation = req.body.operation;
  if(operation === "login"){
    // 验证用户信息
    searchSql($sql.queryUserUid, [uuid]).then((result)=>{
      if(result){
        // 用户信息正确
        searchSql($sql.updateUidState, [uuid, 3, uid]).then((results) => {
          res.send({
            reqCode: 200,
            uid: uid,
            uuid: uuid,
            state: 3
          });
        })
      } else {
        // 用户信息不正确 直接删除
        searchSql($sql.deleteUidState, [uid]).then((results) => {
          res.send({
            uid: uid,
            reqCode: 200,
            state: 4
          });
        })
      }
    })
  } else if(operation === "cancel") {
    searchSql($sql.deleteUidState, [uid]).then((result) => {
      res.send({
        uid: uid,
        reqCode: 200,
        state: 4
      });
    })
  }
});

router.post('/delete', function (req, res){
  var uid = req.body.uid;
  searchSql($sql.deleteUidState, [uid]).then((result) => {
    res.send({
      uid: uid,
      reqCode: 200,
      state: 5
    });
  })
})


// 上传文件
router.post('/profile', function (req, res) {
  const storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
      const fileFormat = (file.originalname).split(".");
      const fileType = fileFormat[fileFormat.length - 1]
      // if (fileType === 'mp4') {
      //   cb(null, './static/video')
      // }
      // if (fileType === 'mp3') {
      //   cb(null, './static/music')
      // }
      if (fileType === 'jpg') {
        cb(null, './public/static/img')
      }
      if (fileType === 'png') {
        cb(null, './public/static/img')
      }
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");
      // cb(null, file.originalname.split('.')[0] + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
      cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
  });
  // 设置路径和文件名
  var uploading = multer({
    storage: storage
  });
  // 制定上传文件name
  var upload = uploading.single('file');

  upload(req, res, function (err) {
    //添加错误处理
    if (err) {
      return console.log(err);
    }
    //文件信息在req.file或者req.files中显示。
    console.log(req.file);
    res.send({
      reqCode: 200,
      reqData: req.file.filename,
      reqMimetype: req.file.mimetype
    })
  });
});

module.exports = router;
