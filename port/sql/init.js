const mysql = require('mysql');
const fs = require('fs')
const dbConfig = require('../config/dbConfig')
const main = require('./search')

const initMysql = () => {
  try {
    // 初始化mysql数据库
    console.log('---init Mysql----');
    const poolConfig = {
      connectionLimit: 80,
      host: dbConfig.serverName,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.dbName,
      connectTimeout: 10000,
      multipleStatements: true,
    };
    pool = mysql.createPool(poolConfig);

    // 初始化数据库表
    const sql = fs.readFileSync('./sql/init.sql').toString();
    pool.query(sql, (err, result) => {
      if (err) throw err;
    });

    // if (dbConfig.passwd instanceof Buffer) {
    //   dbConfig.passwd.fill(0);
    // }
    // dbConfig = {};
    console.log('--init mysql end ---');
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const query = (sql, param, callback = () => { }, useTransaction) =>
  new Promise((resolve, reject) => {
    if (!pool) {
      callback('mysql pool not exist!', null, null);
      reject('mysql pool not exist!');
    } else {
      pool.getConnection((err, conn) => {
        if (err) {
          callback(err, null, null);
          reject(err);
        } else {
          if (useTransaction) {
            conn.beginTransaction(err => {
              if (err) {
                callback(err, null, null);
                reject(err);
              } else {
                conn.query(sql, param, (qerr, vals, fields) => {
                  // 释放连接
                  if (qerr) {
                    conn.rollback(() => console.log('excute sql error, rollback'));
                    conn.release();
                    callback(qerr, vals, fields);
                    reject(qerr);
                    return;
                  }
                  conn.commit(err => {
                    if (err) {
                      console.log('commit sql error');
                      console.log(err);
                      reject(err);
                    }
                  });
                  conn.release();
                  callback(qerr, vals, fields);
                  resolve(vals);
                  return;
                });
              }
            });
          } else {
            conn.query(sql, param, (qerr, vals, fields) => {
              conn.release();
              callback(qerr, vals, fields);
              if (qerr) {
                reject(qerr);
              } else {
                resolve(vals);
              }
            });
          }
        }
      });
    }
  });

// 验证数据库是否初始化完成
const checkTables = (query) => {
  return new Promise((resolve, reject) => {
    init(query)
  })
}

let initTimes = 0;
let m;
const init = (query) => {
  query('show tables;', [], (err, result) => {
    console.log(result)
    if (err) {
      // if (initTimes < 5) {
      //   console.log('init mysql not yet')
      //   setTimeout(() => { init(query) }, 1000);
      // } else {
      //   clearTimeout(init(query));
      //   reject();
      // }
      // initTimes += 1;
      // return;
    }
    initdataLast(init, result, initTimes, query)
    // initTimes += 1;
  });
};


const initdataLast = (init, result, initTimes, query) => {
  // if (result.length < 9 && initTimes < 5) {
  //   console.log(initTimes)
  //   m = setTimeout(() => { init(query); }, 1000);
  // } else if (result.length < 9 && initTimes >= 5) {
  //   console.log(2222);
  //   clearTimeout(m);
  //   checkTables(query)
  // } else {
    console.log(3)
    main(query);
    return false;
  // }
}

//       const time = setInterval(() => {
//         query('show tables;', (err, result) => {
//           console.log(result.length)
//           if (err) throw err;
//           if (result.length === 9) {
//             clearInterval(time);
//             main(query);
//           } else {
//             console.log('init mysql not yet')
//           }
//         });
//       }, 1000)

// const checkInitTable = (query) => {
//   log.info('')
//   return new Promise((resolve, reject) => {
//     const init = () => {
//       const initTimes = 0;
//       query('show tables;', [], (err, result) => {
//         if (err) {
//           if (initTimes < 5) {
//             log.info('init database not finished yet, check it preminute');
//             setTimeout(init, 30000);
//           } else {
//             clearTimeout(init);
//             reject();
//           }
//           initTimes += 1;
//           return;
//         }
//         initData(query);
//         resolve();
//       });
//     };
//     init();
//   });
// };


// var init = () => {
//     const initTimes = 0;
//     query(sql, (err) => {
//       if (err) {
//         if (initTimes < 5) {
//           setTimeout(init, 30000);
//         } else {
//           reject();
//         }
//         initTimes += 1;
//         return;
//       }
//       initData();
//       resolve();
//     });
//   };


//   init();


module.exports = {
  checkTables,
  query,
  initMysql
};