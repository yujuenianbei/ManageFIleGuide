const mysql = require('mysql');
const fs = require('fs')
const dbConfig = require('../config/db')
// const main = require('./search')

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
    const sql = fs.readFileSync('./sql/graphql.sql').toString();
    pool.query(sql, (err, result) => {
      if (err) throw err;
    });
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

// 执行sql语句
async function searchSql($sql,params) {
  return   new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            connection.query($sql, params,function (err, result) {
                connection.release();
                if (err) {
                    reject(err)
                }
                if(result.insertId) result.id = result.insertId;
                 resolve(result);
            });
        });
    })
}

// 验证数据库是否初始化完成
const checkTables = (query) => {
  return new Promise((resolve, reject) => {
    init(query)
  })
}

let initTimes = 0;
const init = (query) => {
  query('show tables;', [], (err, result) => {
    console.log(result)
    if (err) {
    }
    initdataLast(init, result, initTimes, query)
  });
};

const initdataLast = (init, result, initTimes, query) => {
    console.log(3)
    main(query);
    return false;
}


module.exports = {
  checkTables,
  query,
  initMysql,
  searchSql
};