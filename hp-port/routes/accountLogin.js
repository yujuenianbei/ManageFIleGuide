var express = require('express');
var router = express.Router();
var UUID = require('uuid-js');
var qrImg = require('qr-image');

/* GET scanned page. */
router.get('/scanned', function(req, res, next) {
  res.render('aclogin', { title: '扫码登录', qruid: req.query.qruid });
});


let qruid;
//生成二维码
router.get('/loginByPhone', function (req, res) {
  // 生成唯一的ID
  qruid = UUID.create();
  try {
    if (typeof(qruid) !== "undefined"){
      // 写入二维码内的网址，微信扫描后自动跳转
      let jumpURL = "http://192.168.1.128:3004/aclogin/scanned?qruid=" + qruid;
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

module.exports = { router , qruid };
