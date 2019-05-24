/**
 * use to connect
 * */
const Sequelize = require('sequelize');

const Conn = new Sequelize({
    database: 'graphqlTest',
    username: "root",
    password: "123456",
    host: "172.17.0.3",
    dialect: 'mysql', // 'mysql'|'sqlite'|'postgres'|'mssql'
    // 'port': 3306,       // 数据库服务器端口
    // define: {
    //     // 字段以下划线（_）来分割（默认是驼峰命名风格）
    //     'underscored': true
    // }
});
const Novehicle = Conn.define("searchUser", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sex: {
        type: Sequelize.STRING,
        allowNull: true
    },
    intro: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
        // 自定义表名
        'freezeTableName': true,
        'tableName': 'user',

        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': false,

        // 不需要createdAt字段
        'createdAt': false
        /*,

    // 将updatedAt字段改个名
    'updatedAt': 'utime',

    // 将deletedAt字段改名
    // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
    'deletedAt': 'dtime',
    'paranoid': true*/
    });
//freezeTableName: true  这个选项表示，数据库中的表明与程序中的保持一致，否则数据库中的表名会以复数的形式命名

const addUser = Conn.define("addUser", {
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sex: {
        type: Sequelize.STRING,
        allowNull: true
    },
    intro: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
        // 自定义表名
        'freezeTableName': true,
        'tableName': 'user',

        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': false,

        // 不需要createdAt字段
        'createdAt': false
    });

module.exports = Conn;