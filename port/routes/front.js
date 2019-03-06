const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const { query } = require('../sql/init');

// //引入redis
// var redis = require("redis");
// //创建redis客户端
// var client = redis.createClient("6379", "127.0.0.1");
// //连接错误处理
// client.on("error", function (error) {
//   console.log(error);
// });
// //redis验证 （如果redis没有开启验证，此配置可以不写）
// client.auth("492275105");
// //查找

// router.get('/getRedis', function (req, res, next) {
//   client.set("node_redis_key", JSON.stringify({ "name": "antonio", age: 28 }), function (error, resr) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(resr);
//     };
//     //操作完成，关闭redis连接
//     client.end(true);
//     res.send({
//       reqCode: 200,
//       reqData: resr
//     });
//   });
// })

// banner 置顶
router.get('/imgList/banner', function (req, res, next) {
  const musicTopList = `select * from imgList where imgList.img_top = 1 limit 5`
  query(musicTopList, [], function (err, rows, fields) {
    res.send({
      reqCode: 200,
      reqData: {
        data: rows
      }
    });
  })
});

/********************************
 * 音乐
********************************/

// 有新动态 10条
router.get('/musicList/newTrends', function (req, res, next) {
  const musicTopList = `select * from songList order by song_id desc limit 10`
  query(musicTopList, [], function (err, rows, fields) {
    let data= [];
    rows.forEach((item) => {
      // 判断是否有空格
      data.push({
        id: item.song_id,
        name: item.song_name,
        img: item.song_img.split(' ').join('%20'),
        url: item.song_name + '/' +item.song_img.split(' ').join('%20')
      })
    })
    res.send({
      reqCode: 200,
      reqData: {
        data: data
      }
    });
  })
});
// 最新投稿 10条
router.get('/musicList/newContribute', function (req, res, next) {
  const musicTopList = `select * from songList order by update_time asc limit 10`
  query(musicTopList, [], function (err, rows, fields) {
    let data= [];
    rows.forEach((item) => {
      // 判断是否有空格
      data.push({
        id: item.song_id,
        name: item.song_name,
        img: item.song_img.split(' ').join('%20'),
        url: item.song_name + '/' +item.song_img.split(' ').join('%20')
      })
    })
    res.send({
      reqCode: 200,
      reqData: {
        data: data
      }
    });
  })
});
// 全部 7条
router.get('/musicList/topSeven', function (req, res, next) {
  const musicTopList = `select * from songList order by song_id desc limit 7`
  query(musicTopList, [], function (err, rows, fields) {
    let data= [];
    rows.forEach((item) => {
      // 判断是否有空格
      data.push({
        id: item.song_id,
        name: item.song_name,
        img: item.song_img.split(' ').join('%20'),
        url: item.song_name + '/' +item.song_img.split(' ').join('%20')
      })
    })
    res.send({
      reqCode: 200,
      reqData: {
        data: data
      }
    });
  })
});
// 最新音乐 7条
router.get('/musicList/newSeven', function (req, res, next) {
  const musicTopList = `select * from songList order by update_time desc limit 7`
  query(musicTopList, [], function (err, rows, fields) {
    let data= [];
    rows.forEach((item) => {
      // 判断是否有空格
      data.push({
        id: item.song_id,
        name: item.song_name,
        img: item.song_img.split(' ').join('%20'),
        url: item.song_name + '/' +item.song_img.split(' ').join('%20')
      })
    })
    res.send({
      reqCode: 200,
      reqData: {
        data: data
      }
    });
  })
});

/********************************
 * 视频
********************************/

// 有新动态 10条
router.get('/videoList/newTrends', function (req, res, next) {
  const musicTopList = `select * from videoList order by video_id desc limit 10`
  query(musicTopList, [], function (err, rows, fields) {
    let data= [];
    rows.forEach((item) => {
      // 判断是否有空格
      data.push({
        id: item.video_id,
        name: item.video_name,
        img: item.video_img.split(' ').join('%20'),
        url: item.video_url
      })
    })
    res.send({
      reqCode: 200,
      reqData: {
        data: data
      }
    });
  })
});
// 最新投稿 10条
router.get('/videoList/newContribute', function (req, res, next) {
  const musicTopList = `select * from videoList order by update_time asc limit 10`
  query(musicTopList, [], function (err, rows, fields) {
    let data= [];
    rows.forEach((item) => {
      // 判断是否有空格
      data.push({
        id: item.video_id,
        name: item.video_name,
        img: item.video_img.split(' ').join('%20'),
        url: item.video_url
      })
    })
    res.send({
      reqCode: 200,
      reqData: {
        data: data
      }
    });
  })
});
// 全部 7条
router.get('/videoList/topSeven', function (req, res, next) {
  const musicTopList = `select * from videoList order by video_id desc limit 7`
  query(musicTopList, [], function (err, rows, fields) {
    let data= [];
    rows.forEach((item) => {
      // 判断是否有空格
      data.push({
        id: item.video_id,
        name: item.video_name,
        img: item.video_img.split(' ').join('%20'),
        url: item.video_url
      })
    })
    res.send({
      reqCode: 200,
      reqData: {
        data: data
      }
    });
  })
});
// 最新音乐 7条
router.get('/videoList/newSeven', function (req, res, next) {
  const musicTopList = `select * from videoList order by update_time desc limit 7`
  query(musicTopList, [], function (err, rows, fields) {
    let data= [];
    rows.forEach((item) => {
      // 判断是否有空格
      data.push({
        id: item.video_id,
        name: item.video_name,
        img: item.video_img.split(' ').join('%20'),
        url: item.video_url
      })
    })
    res.send({
      reqCode: 200,
      reqData: {
        data: data
      }
    });
  })
});

/*
* 获取单条信息
*/
router.post('/video', function (req, res, next) {
  const response = {
    video_id: req.body.id
  }
  const musicTopList = `select * from videoList where video_id = ?`
  query(musicTopList, [response.video_id], function (err, rows, fields) {
    let data= [];
    rows.forEach((item) => {
      // 判断是否有空格
      data.push({
        id: item.video_id,
        name: item.video_name,
        author_name: item.author_name,
        album_name: item.album_name,
        album_date: item.album_data,
        img: item.video_img.split(' ').join('%20'),
        url: item.video_url
      })
    })
    res.send({
      reqCode: 200,
      reqData: {
        data: data
      }
    });
  })
});

router.post('/music', function (req, res, next) {
  const response = {
    video_id: req.body.id
  }
  const musicTopList = `select * from songList where song_id = ?`
  query(musicTopList, [response.video_id], function (err, rows, fields) {
    let data= [];
    rows.forEach((item) => {
      // 判断是否有空格
      data.push({
        id: item.song_id,
        name: item.song_name,
        author_name: item.author_name,
        album_name: item.album_name,
        album_date: item.album_data,
        img: item.song_img.split(' ').join('%20'),
        songTime: item.song_time,
        url: item.song_url
      })
    })
    res.send({
      reqCode: 200,
      reqData: {
        data: data
      }
    });
  })
});


router.post('/musicLyric', function (req, res, next) {
  const response = {
    video_id: req.body.id
  }
  const musicTopList = `select * from lyricList where song_id = ?`
  query(musicTopList, [response.video_id], function (err, rows, fields) {
    let data= [];
    rows.forEach((item) => {
      // 判断是否有空格
      data.push({
        id: item.lyric_id,
        song_id: item.song_id,
        lyric_content: item.lyric_content
      })
    })
    res.send({
      reqCode: 200,
      reqData: {
        data: data
      }
    });
  })
});

// router.get('/musicList/main', function (req, res, next) {
//   res.send({
//     reqCode: 200,
//     reqData: 'first'
//   });
// })

module.exports = router;
