const listInfo = require('../config/listInfo');
const userList = require('../config/userList');

function main(query) {
  // const addNmae = `INSERT INTO userlist (id, name, lastname, age) VALUES (1, 'antonio', 'teddy', 28)`;
  // query(addNmae, []).then(result => {
  //     // if (result && result[0]['count(*)'] >= maxReportCount) {
  //     //   log.error(`report count is ${JSON.stringify(result)}.`);
  //     //   throw new Error('OC.000004');
  //     // }
  //     console.log(result)
  // })

  // 需要添加对初始化数据的判断

  // 初始化左侧列表
  let param = '';
  listInfo.forEach(data => {
    param += `(${JSON.stringify(data.id)},
      ${JSON.stringify(data.list_type)},${JSON.stringify(data.list_name)},
      ${JSON.stringify(data.list_link)},${JSON.stringify(data.list_parent_id)}, NOW(), NOW()),`;
  });
  param = param.substring(0, param.length - 1);
  const leftInfoSQL = `insert ignore leftList(id, list_type, list_name, list_link, list_parent_id, create_time, update_time)
      values${param};`;
  query(leftInfoSQL, [], (err) => {
    if (err) {
      console.log('init leftinfo error', err);
    } else {
      console.log('init leftinfo success');
    }
  });
  // 初始化root用户
  param = '';
  userList.forEach(data => {
    param += `(${JSON.stringify(data.id)},
      ${JSON.stringify(data.user_name)},${JSON.stringify(data.user_password)},
      ${JSON.stringify(data.user_realname)},${JSON.stringify(data.user_birthday)},${JSON.stringify(data.user_id)}, NOW(), NOW()),`;
  });
  param = param.substring(0, param.length - 1);
  const userInfoSQL = `insert ignore userList(id, user_name, user_password, user_realname, user_birthday, user_id, create_time, update_time)
      values${param};`;
  query(userInfoSQL, [], (err) => {
    if (err) {
      console.log('init userinfo error', err);
    } else {
      console.log('init userinfo success');
    }
  });
  // // 初始化歌曲列表
  // param = '';
  // songList.forEach(data => {
  //   param += `(${JSON.stringify(data.song_name)},${JSON.stringify(data.author_name)},
  //         ${JSON.stringify(data.song_img)},${JSON.stringify(data.song_url)},${JSON.stringify(data.album_name)},${JSON.stringify(data.album_data)}, NOW(), NOW()),`;
  // });
  // param = param.substring(0, param.length - 1);
  // const songListSQL = `insert ignore songList(song_name, author_name, song_img, song_url,album_name, album_data, create_time, update_time)
  //         values${param};`;

  // query(songListSQL, [], (err) => {
  //   if (err) {
  //     console.log('init songList error', err);
  //   } else {
  //     console.log('init songList success');
  //   }
  // });
 




  //   .then(() => {
  //     const state = JSON.stringify(moreport.state);
  //     const title = moreport.title.trim();
  //     const id = generateUUID();
  //     const sql = 'insert report_table(id, title, description, preset, reportgroup, chartExist, state, isShow, realtime, user, tag, showType, createtime, modifytime) ' +
  //       'values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), now());';
  //     return query(sql, [id, title, moreport.desc, moreport.preset, moreport.reportgroup,
  //       moreport.chartExist, state, moreport.isShow, moreport.realtime, moreport.user, moreport.tag, moreport.showType]).then(() => {
  //         log.info(`create report success. moreport id is ${id}, moreport title is ${title}`);
  //         res.status(200).send({ resultCode: 'OC.000000', resultData: { id } });
  //       });
  //   })
  //   .catch(err => {
  //     if (err.toString().indexOf('Duplicate') >= 0) {
  //       log.error(`create moreport failed, moreport name is duplicate. err is ${err}`);
  //       res.status(200).send({ resultCode: 'OC.000003', resultData: {} });
  //     } else if (err.message === 'OC.000004') {
  //       log.error(`create moreport failed, err is ${err}. report count reaches the max value 300.`);
  //       res.status(200).send({ resultCode: 'OC.000004', resultData: {} });
  //     } else {
  //       log.error(`create moreport failed, err is ${err}`);
  //       res.status(200).send({ resultCode: 'OC.000001', resultData: {} });
  //     }
  //   });
}

module.exports = main