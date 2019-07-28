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
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLScalarType,
    GraphQLEnumValue,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql');
const Db = require('../../sql/db');
const { 
    RegFrontUser,
    UpdateFrontUser,
    QueryAllFrontUser,
    DeleteFrontUser,
    ValidateFrontUser,
    SearchFrontUser,
    FrontUserTotal
} = require('./frontUserSchema');

module.exports = {
    query: {
        // 查询所有的用户
        queryAllFrontUser: {
            type: new GraphQLList(QueryAllFrontUser),
            description: '获取全部前台用户信息',
            resolve: async function () {
                return await searchSql($sql.queryAllFrontUser);
            }
        }
    },
    mutation: {
        // 注册用户
        regFrontUser: {
            type: new GraphQLList(RegFrontUser),
            description: '后台用户注册',
            args: {
                name: { type: GraphQLString },
                sex: { type: GraphQLInt },
                email: { type: GraphQLString },
                phoneCode: { type: GraphQLInt },
                phone: { type: GraphQLString },
                password: { type: GraphQLString },
                company: { type: GraphQLString }
            },
            resolve: async function (source, { name, sex, email, phoneCode, phone, password, company }) {
                // 查询用户名注册没
                return await searchSql($sql.queryFrontUserByUserName, [name])
                    .then(async (reslut) => {
                        if (reslut.length === 0) {
                            // 新增用户
                            return await searchSql($sql.insertFrontUser, [name, sex, email, phoneCode, phone, password, company])
                                .then(async (resluts) => {
                                    // 查询用户
                                    return await searchSql($sql.queryFrontUserById, [resluts.id]).then(async (reslutData) => {
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
        updateFrontUser: {
            type: new GraphQLList(UpdateFrontUser),
            description: '前台用户编辑',
            args: {
                id: { type: GraphQLInt },
                name: { type: GraphQLString },
                sex: { type: GraphQLInt },
                email: { type: GraphQLString },
                phoneCode: { type: GraphQLInt },
                phone: { type: GraphQLString },
                password: { type: GraphQLString },
                company: { type: GraphQLString }
            },
            resolve: async function (source, { name, sex, email, phoneCode, phone, password, company, id }) {
                console.log(name, sex, email, phoneCode, phone, password, company, id)
                // 查询用户名注册没
                return await searchSql($sql.queryFrontUserById, [id])
                    .then(async (reslut) => {
                        if (reslut.length === 1) {
                            // 修改用户
                            return await searchSql($sql.updateFrontUser, [name, sex, email, phoneCode, phone, password, company, id])
                                .then(async (resluts) => {
                                    // 查询用户
                                    return await searchSql($sql.queryFrontUserById, [id]).then(async (reslutData) => {
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
        deleteFrontUser: {
            type: new GraphQLList(DeleteFrontUser),
            description: '前台用户删除',
            args: {
                id: { type: GraphQLID }
            },
            resolve: async function (source, { id }) {
                // 查询用户名注册没
                return await searchSql($sql.queryFrontUserById, [id])
                    .then(async (reslut) => {
                        if (reslut.length === 1) {
                            // 删除用户
                            return await searchSql($sql.deleteFrontUserById, [id])
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
                            // 没有用户
                            let resluts = [{}];
                            resluts[0].state = 0;
                            return await resluts;
                        }
                    })
            }
        },
        // 校验用户名
        validateFrontUser: {
            type: new GraphQLList(ValidateFrontUser),
            description: '前台用户验证',
            args: {
                name: { type: GraphQLString },
            },
            resolve: async function (source, { name }) {
                // 查询用户名注册没
                return await searchSql($sql.queryFrontUserByUserName, [name])
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
        searchFrontUser: {
            type: new GraphQLList(SearchFrontUser),
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
                if (type !== '' && value !== '' && type !== 'sex') {
                    value = '%' + value + '%'
                    console.log(`SELECT * FROM user WHERE ${type} like ${JSON.stringify(value)} ORDER BY ${type} ${sort} limit ${start},${pageSize}`)
                    return await searchSql(`SELECT * FROM user WHERE ${type} like ${JSON.stringify(value)} ORDER BY ${type} ${sort} limit ${start},${pageSize}`)
                        .then(async (reslut) => {
                            return reslut;
                        })
                } else if ((type === 'sex') && intvalue !== 9) {
                    console.log(`SELECT * FROM user WHERE ${type} like '%${intvalue}%' ORDER BY ${type} ${sort} limit ${start},${pageSize}`)
                    return await searchSql(`SELECT * FROM user WHERE ${type} like ? ORDER BY ${type} ${sort} limit ${start},${pageSize}`, [`%${intvalue}%`])
                        .then(async (reslut) => {
                            return reslut;
                        })
                } else {
                    console.log(`SELECT * FROM user limit ${start},${pageSize}`)
                    return await searchSql(`SELECT * FROM user limit ${start},${pageSize}`)
                        .then(async (reslut) => {
                            return reslut;
                        })
                }
            }

        },
        // 搜索的总数
        frontUserTotal: {
            type: FrontUserTotal,
            description: '根据条件进行前台用户搜索',
            args: {
                value: { type: GraphQLString },
                intvalue: { type: GraphQLInt },
                type: { type: GraphQLString }
            },
            resolve: async function (source, { intvalue, value, type }) {
                // console.log(intvalue, value, type)
                if (type === "" || value === "") {
                    return await searchSql($sql.searchAllFrontUser)
                        .then(async (reslut) => {
                            // console.log(1, reslut);
                            return await reslut[0];
                        })
                } else {
                    if (type !== "sex" && type !== "phoneCode") {
                        return await searchSql(`SELECT count(*) as total FROM user WHERE ${type} like ?`, [`%${value}%`])
                            .then(async (reslut) => {
                                // console.log(2, reslut);
                                return await reslut[0];
                            })
                    } else {
                        return await searchSql(`SELECT count(*) as total FROM user WHERE ${type} like ? `, [`%${intvalue}%`])
                            .then(async (reslut) => {
                                // console.log(3, reslut);
                                return await reslut[0];
                            })
                    }
                }

            }
        }

    }
};