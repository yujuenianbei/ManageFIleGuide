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
const { AddProduct, UpdateProduct, DeleteProduct, ValidateAcoount, SearchProduct, PorductTotal } = require('./productSchema');

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
                features: { type: GraphQLString },
                promotionMessageSecond: { type: GraphQLString },
                usedPrice: { type: GraphQLInt },
                nowPrice: { type: GraphQLInt }
            },
            resolve: async function (source, { productName, type, img, promotionMessage, features, promotionMessageSecond, usedPrice, nowPrice }) {
                // 查询用户名注册没
                return await searchSql($sql.queryEndProductByName, [productName])
                    .then(async (reslut) => {
                        if (reslut.length === 0) {
                            // 新增产品
                            return await searchSql($sql.insertEndProduct, [productName, type, img, promotionMessage, features, promotionMessageSecond, usedPrice, nowPrice])
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
        // 更新产品
        updateProduct: {
            type: new GraphQLList(UpdateProduct),
            description: '编辑产品',
            args: {
                id: { type: GraphQLInt },
                productName: { type: GraphQLString },
                type: { type: GraphQLInt },
                img: { type: GraphQLString },
                promotionMessage: { type: GraphQLString },
                features: { type: GraphQLString },
                promotionMessageSecond: { type: GraphQLString },
                usedPrice: { type: GraphQLInt },
                nowPrice: { type: GraphQLInt }
            },
            resolve: async function (source, { id, productName, type, img, promotionMessage, features, promotionMessageSecond, usedPrice, nowPrice }) {
               console.log(id, productName, type, img, promotionMessage, features, promotionMessageSecond, usedPrice, nowPrice)
                // 查询产品是否存在
                return await searchSql($sql.queryEndProductById, [id])
                    .then(async (reslut) => {
                        console.log(reslut)
                        if (reslut.length === 1) {
                            // 修改产品信息
                            return await searchSql($sql.updateEndProduct, [productName, type, img, promotionMessage, features, promotionMessageSecond, usedPrice, nowPrice, id])
                                .then(async (resluts) => {
                                    // 查询修改后的产品
                                    return await searchSql($sql.queryEndProductById, [id]).then(async (reslutData) => {
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
                    return await searchSql(`SELECT count(*) as total FROM product WHERE ${type} like ?`, [`%${value}%`])
                        .then(async (reslut) => {
                            console.log(2, reslut);
                            return await reslut[0];
                        })
                }

            }
        },
    }
};