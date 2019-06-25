const jwt = require('jsonwebtoken')
const $sql = require('../../dao/endPortSqlMapping');
const { searchSql } = require("../../sql/init")
const {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLScalarType,
    GraphQLEnumValue,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql');
const Db = require('../../sql/db');
const { Login, Reg, UpdateAccount, LoginUuid, QueryAllUser, DeleteAcoount, ValidateAcoount, SearchAccount, AccountTotal } = require('./accountSchema');

module.exports = {
    query: {
        // 查询所有的用户
        queryAllUsers: {
            type: new GraphQLList(QueryAllUser),
            description: '获取全部后台用户信息',
            resolve: async function () {
                return await searchSql($sql.queryAllEndUser);
            }
        }
    },
    mutation: {
        // uuid登录
        loginUuid: {
            type: new GraphQLList(LoginUuid),
            description: '后台用户登录uuid',
            args: {
                uuid: { type: GraphQLString },
            },
            resolve: async function (source, { uuid, state }) {
                return await searchSql($sql.queryUserUid, [uuid])
                    .then((reslut) => {
                        console.log(reslut)
                        if (reslut) {
                            // 更新用户最后登录时间
                            const curTime = new Date();
                            let portDate = curTime.setHours(curTime.getHours() + 8);
                            console.log(new Date(portDate))
                            searchSql($sql.updateUserLoginTime, [new Date(portDate), reslut[0].id])
                            // 密钥
                            const secret = 'ILOVENINGHAO'
                            const payload = {
                                name: reslut[0].name.username,
                                admin: true
                            }
                            const token = jwt.sign(payload, secret, { expiresIn: '1day' })
                            reslut[0].state = 1;
                            reslut[0].token = token
                        } else {
                            reslut[0].state = 2
                            reslut[0].token = null
                        }
                        return reslut
                    })
            }
        },
        // 用户名密码登录
        login: {
            type: new GraphQLList(Login),
            description: '后台用户登录',
            args: {
                email: { type: GraphQLString },
                name: { type: GraphQLString },
                password: { type: GraphQLString },
                state: { type: GraphQLString },
            },
            resolve: async function (source, { name, password, state }) {
                return await searchSql($sql.queryByUsername, [name])
                    .then((reslut) => {
                        console.log(reslut)
                        if (password === reslut[0].password) {
                            // 更新用户最后登录时间
                            const curTime = new Date();
                            let portDate = curTime.setHours(curTime.getHours() + 8);
                            console.log(new Date(portDate))
                            searchSql($sql.updateUserLoginTime, [new Date(portDate), reslut[0].id])
                            // 密钥
                            const secret = 'ILOVENINGHAO'
                            const payload = {
                                name: name.username,
                                admin: true
                            }
                            const token = jwt.sign(payload, secret, { expiresIn: '1day' })
                            reslut[0].state = 1;
                            reslut[0].token = token
                        } else {
                            reslut[0].state = 2
                            reslut[0].token = null
                        }
                        return reslut
                    })
                // return (await searchSql($sql.queryByUsername, [name]));
            }
        },
        // 注册用户
        regAccount: {
            type: new GraphQLList(Reg),
            description: '后台用户注册',
            args: {
                userName: { type: GraphQLString },
                sex: { type: GraphQLInt },
                email: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                phoneCode: { type: GraphQLInt },
                phone: { type: GraphQLString },
                password: { type: GraphQLString },
                company: { type: GraphQLString }
            },
            resolve: async function (source, { userName, sex, email, firstName, lastName, phoneCode, phone, password, company }) {
                // 查询用户名注册没
                return await searchSql($sql.queryEndUserByUserName, [userName])
                    .then(async (reslut) => {
                        if (reslut.length === 0) {
                            // 新增用户
                            return await searchSql($sql.insertEndUser, [userName, sex, email, firstName, lastName, phoneCode, phone, password, company])
                                .then(async (resluts) => {
                                    // 查询用户
                                    return await searchSql($sql.queryEndUserById, [resluts.id]).then(async (reslutData) => {
                                        reslutData[0].state = 1;
                                        return await reslutData;
                                    });
                                })
                        } else {
                            // 已有用户
                            reslutData = [{}];
                            reslutData[0].state = 0;
                            return await reslutData;
                        }
                    })
            }
        },
        // 更新用户
        updateAccount: {
            type: new GraphQLList(UpdateAccount),
            description: '后台用户编辑',
            args: {
                id: { type: GraphQLInt },
                userName: { type: GraphQLString },
                sex: { type: GraphQLInt },
                email: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                phoneCode: { type: GraphQLInt },
                phone: { type: GraphQLString },
                password: { type: GraphQLString },
                company: { type: GraphQLString }
            },
            resolve: async function (source, { userName, sex, email, firstName, lastName, phoneCode, phone, password, company, id }) {
                // 查询用户名注册没
                return await searchSql($sql.queryEndUserById, [id])
                    .then(async (reslut) => {
                        if (reslut.length === 1) {
                            // 修改用户
                            return await searchSql($sql.updateEndUser, [userName, sex, email, firstName, lastName, phoneCode, phone, password, company, id])
                                .then(async (resluts) => {
                                    // 查询用户
                                    return await searchSql($sql.queryEndUserById, [id]).then(async (reslutData) => {
                                        reslutData[0].state = 1;
                                        return await reslutData;
                                    });
                                })
                        } else {
                            // 已有用户
                            reslutData = [{}];
                            reslutData[0].state = 0;
                            return await reslutData;
                        }
                    })
            }
        },
        // 删除用户
        deleteAccount: {
            type: new GraphQLList(DeleteAcoount),
            description: '后台用户删除',
            args: {
                id: { type: GraphQLID }
            },
            resolve: async function (source, { id }) {
                // 查询用户名注册没
                return await searchSql($sql.queryEndUserById, [id])
                    .then(async (reslut) => {
                        console.log(reslut.length)
                        if (reslut.length === 1) {
                            // 新增用户
                            return await searchSql($sql.deleteEndUserById, [id])
                                .then(async (resluts) => {
                                    let reslutData = [{}];
                                    if (resluts.affectedRows > 0) {
                                        reslutData[0].state = 1;
                                    } else {
                                        reslutData[0].state = 0;
                                    }
                                    return await reslutData;
                                })
                        } else {
                            // 已有用户
                            let resluts = [{}];
                            resluts[0].state = 0;
                            return await resluts;
                        }
                    })
            }
        },
        // 校验用户名
        validateAccount: {
            type: new GraphQLList(ValidateAcoount),
            description: '后台用户验证',
            args: {
                userName: { type: GraphQLString },
            },
            resolve: async function (source, { userName }) {
                // 查询用户名注册没
                return await searchSql($sql.queryEndUserByUserName, [userName])
                    .then(async (reslut) => {
                        if (reslut.length === 1) {
                            // 已有用户
                            reslutData = [{}];
                            reslutData[0].state = 0;
                            return await reslutData;
                        } else {
                            // 已有用户
                            reslutData = [{}];
                            reslutData[0].state = 1;
                            return await reslutData;
                        }
                    })
            }
        },
        //搜索
        searchAccount: {
            type: new GraphQLList(SearchAccount),
            description: '根据条件进行搜索',
            args: {
                value: { type: GraphQLString },
                intvalue: { type: GraphQLInt },
                type: { type: GraphQLString },
                start: { type: GraphQLInt },
                pageSize: { type: GraphQLInt },
                sort: { type: GraphQLString }  //ASC DEC
            },
            resolve: async function (source, { intvalue, value, type, start, pageSize, sort }) {
                // type 没选 全局搜
                if (type !== '' && value !== '' && type !== 'sex' && type !== 'phoneCode') {
                    value = '%'+value+'%'
                    return await searchSql(`SELECT * FROM account WHERE ${type} like ${JSON.stringify(value)} ORDER BY ${type} ${sort} limit ${start},${pageSize}`)
                        .then(async (reslut) => {
                            return reslut;
                        })
                } else if ((type === 'sex' || type === 'phoneCode') && intvalue !== 9) {
                    console.log(`SELECT * FROM account WHERE ${type} like %${intvalue}% ORDER BY ${type} ${sort} limit ${start},${pageSize}`)
                    return await searchSql(`SELECT * FROM account WHERE ${type} like ? ORDER BY ${type} ${sort} limit ${start},${pageSize}`, [`%${intvalue}%`])
                        .then(async (reslut) => {
                            return reslut;
                        })
                } else {
                    return await searchSql(`SELECT * FROM account limit ${start},${pageSize}`)
                        .then(async (reslut) => {
                            return reslut;
                        })
                }
            }

        },
        // 搜索的总数
        total: {
            type: AccountTotal,
            description: '根据条件进行搜索',
            args: {
                value: { type: GraphQLString },
                intvalue: { type: GraphQLInt },
                type: { type: GraphQLString }
            },
            resolve: async function (source, { intvalue, value, type }) {
                console.log(intvalue, value, type)
                if (type === "" || value === "") {
                    return await searchSql($sql.queryAllEndUser)
                        .then(async (reslut) => {
                            return await searchSql($sql.searchTotal).then(
                                async (resluts) => {
                                    console.log(1, resluts);
                                    return await resluts[0];
                                }
                            )
                        })
                } else {
                    if (type !== "sex" && type !== "phoneCode") {
                        return await searchSql(`SELECT * FROM account WHERE ${type} like ?`, [`%${value}%`])
                            .then(async (reslut) => {
                                return await searchSql($sql.searchTotal).then(
                                    async (resluts) => {
                                        console.log(2, resluts);
                                        return await resluts[0];
                                    }
                                )
                            })
                    } else {
                        return await searchSql(`SELECT * FROM account WHERE ${type} like ? `, [`%${intvalue}%`])
                            .then(async (reslut) => {
                                return await searchSql($sql.searchTotal).then(
                                    async (resluts) => {
                                        console.log(3, resluts);
                                        return await resluts[0];
                                    }
                                )
                            })
                    }
                }

            }
        }

    }
};