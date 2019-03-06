// const fs = require('fs');
// let p1 = new Promise((resolve, reject) => {
//     fs.unlink('../static/img/' + 'csgo2-1538630677265.jpg', function (err) {
//         if (err) return console.log(err);
//         console.log('图片删除成功');
//         resolve('1');
//     })
// })

// let p2 = new Promise((resolve, reject) => {
//     fs.unlink('../static/music/' + '3rd Storee - Tonight-1538630686478.mp3', function (err) {
//         if (err) return console.log(err);
//         console.log('歌曲删除成功');
//         resolve('2');
//     })
// })

// Promise.all([p1, p2]).then((result) => {
//     console.log(result)               //['成功了', 'success']
//     res.send({
//         reqCode: 200,
//         reqData: {
//             songInfo: rows
//         }
//     });
// }).catch((error) => {
//     console.log(error)
// })
const [a,b,c,d,e] = 'hello';
console.log(a,b,c,d,e)
let {length: len} = 'hello';
console.log(len)