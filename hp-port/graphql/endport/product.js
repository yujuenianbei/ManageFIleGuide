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
const { AddProduct, DeleteProduct, ValidateAcoount, SearchProduct, PorductTotal } = require('./productSchema');

module.exports = {
    query: {
        // // 查询所有的用户
        // queryAllUsers: {
        //     type: new GraphQLList(QueryAllUser),
        //     description: '获取全部后台用户信息',
        //     resolve: async function () {
        //         return await searchSql($sql.queryAllEndUser);
        //     }
        // }
    },
    mutation: {
        // 添加产品
        addProduct: {
            type: new GraphQLList(AddProduct),
            description: '添加产品',
            args: {
                id: { type: GraphQLInt },
                productName: { type: GraphQLString },
                type: { type: GraphQLInt },
                img: { type: GraphQLString },
                promotionMessage: { type: GraphQLString },
                featrues: { type: GraphQLString },
                promotionMessageSecond: { type: GraphQLString },
                usedPrice: { type: GraphQLInt },
                nowPrice: { type: GraphQLInt }
            },
            resolve: async function (source, { productName, type, img, promotionMessage, featrues, promotionMessageSecond, usedPrice, nowPrice }) {
                // 查询用户名注册没
                return await searchSql($sql.queryEndProductByName, [productName])
                    .then(async (reslut) => {
                        if (reslut.length === 0) {
                            // 新增产品
                            return await searchSql($sql.insertEndProduct, [productName, type, img, promotionMessage, featrues, promotionMessageSecond, usedPrice, nowPrice])
                                .then(async (resluts) => {
                                    // 查询产品是否添加成功
                                    return await searchSql($sql.queryEndProductById, [resluts.id]).then(async (reslutData) => {
                                        reslutData[0].state = 1;
                                        return await reslutData;
                                    });
                                })
                        } else {
                            // 已有产品
                            reslutData = [{}];
                            reslutData[0].state = 0;
                            return await reslutData;
                        }
                    })
            }
        },
        // // 更新产品
        // updateProduct: {
        //     type: new GraphQLList(UpdateAccount),
        //     description: '后台用户编辑',
        //     args: {
        //         id: { type: GraphQLInt },
        //         userName: { type: GraphQLString },
        //         sex: { type: GraphQLInt },
        //         email: { type: GraphQLString },
        //         firstName: { type: GraphQLString },
        //         lastName: { type: GraphQLString },
        //         phoneCode: { type: GraphQLInt },
        //         phone: { type: GraphQLString },
        //         password: { type: GraphQLString },
        //         company: { type: GraphQLString }
        //     },
        //     resolve: async function (source, { userName, sex, email, firstName, lastName, phoneCode, phone, password, company, id }) {
        //         // 查询用户名注册没
        //         return await searchSql($sql.queryEndUserById, [id])
        //             .then(async (reslut) => {
        //                 if (reslut.length === 1) {
        //                     // 修改用户
        //                     return await searchSql($sql.updateEndUser, [userName, sex, email, firstName, lastName, phoneCode, phone, password, company, id])
        //                         .then(async (resluts) => {
        //                             // 查询用户
        //                             return await searchSql($sql.queryEndUserById, [id]).then(async (reslutData) => {
        //                                 reslutData[0].state = 1;
        //                                 return await reslutData;
        //                             });
        //                         })
        //                 } else {
        //                     // 已有用户
        //                     reslutData = [{}];
        //                     reslutData[0].state = 0;
        //                     return await reslutData;
        //                 }
        //             })
        //     }
        // },
        // 删除产品
        deleteProduct: {
            type: DeleteProduct,
            description: '删除产品',
            args: {
                id: { type: GraphQLID }
            },
            resolve: async function (source, { id }) {
                // 查询用户名注册没
                return await searchSql($sql.queryEndProductById, [id])
                    .then(async (reslut) => {
                        console.log(reslut.length)
                        if (reslut.length === 1) {
                            // 删除产品
                            return await searchSql($sql.deleteEndProduct, [id])
                                .then(async (resluts) => {
                                    let reslutData = {};
                                    if (resluts.affectedRows > 0) {
                                        reslutData.state = 1;
                                    } else {
                                        reslutData.state = 0;
                                    }
                                    return await reslutData;
                                })
                        } else {
                            // 已有用户
                            let resluts = {};
                            resluts.state = 0;
                            return await resluts;
                        }
                    })
            }
        },
        // // 校验用户名
        // validateProduct: {
        //     type: new GraphQLList(ValidateAcoount),
        //     description: '后台用户验证',
        //     args: {
        //         userName: { type: GraphQLString },
        //     },
        //     resolve: async function (source, { userName }) {
        //         // 查询用户名注册没
        //         return await searchSql($sql.queryEndUserByUserName, [userName])
        //             .then(async (reslut) => {
        //                 if (reslut.length === 1) {
        //                     // 已有用户
        //                     reslutData = [{}];
        //                     reslutData[0].state = 0;
        //                     return await reslutData;
        //                 } else {
        //                     // 已有用户
        //                     reslutData = [{}];
        //                     reslutData[0].state = 1;
        //                     return await reslutData;
        //                 }
        //             })
        //     }
        // },

        // 搜索
        searchProduct: {
            type: new GraphQLList(SearchProduct),
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
                if (type !== '' && value !== '') {
                    value = '%' + value + '%'
                    return await searchSql(`SELECT * FROM product WHERE ${type} like ${JSON.stringify(value)} ORDER BY ${type} ${sort} limit ${start},${pageSize}`)
                        .then(async (reslut) => {
                            return reslut;
                        })
                } 
                else {
                    return await searchSql(`SELECT * FROM product limit ${start},${pageSize}`)
                        .then(async (reslut) => {
                            return reslut;
                        })
                }
            }
        },

        // 搜索的总数
        totalProduct: {
            type: PorductTotal,
            description: '根据条件进行搜索',
            args: {
                value: { type: GraphQLString },
                intvalue: { type: GraphQLInt },
                type: { type: GraphQLString }
            },
            resolve: async function (source, { intvalue, value, type }) {
                console.log(intvalue, value, type)
                if (type === "" || value === "") {
                    return await searchSql($sql.searchAllProduct)
                        .then(async (reslut) => {
                            console.log(1, reslut);
                            return await reslut[0];
                        })
                } else {
                    console.log(`SELECT count(*) as total FROM product WHERE ${type} like %${value}%`)
                    // if (type !== "sex" && type !== "phoneCode") {
                        return await searchSql(`SELECT count(*) as total FROM product WHERE ${type} like ?`, [`%${value}%`])
                            .then(async (reslut) => {
                                console.log(2, reslut);
                                return await reslut[0];
                            })
                    // } else {
                    //     return await searchSql(`SELECT count(*) as total FROM account WHERE ${type} like ? `, [`%${intvalue}%`])
                    //         .then(async (reslut) => {
                    //             console.log(3, reslut);
                    //             return await reslut[0];
                    //         })
                    // }
                }

            }
        },
    }
};