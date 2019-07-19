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
const { queryAllProductType, DeleteProductType, PorductTypeTotal } = require('./productTypeSchema');

module.exports = {
    query: {
        // 获取产品分类
        AllProductType: {
            type: new GraphQLList(queryAllProductType),
            description: '获取所有产品分类',
            resolve: async function () {
                return await searchSql($sql.queryAllEndProductType)
                    .then(async (reslut) => {
                        return await reslut;
                    })
            }
        }
    },
    mutation: {
        // 添加分类
        addProductType: {
            type: new GraphQLList(queryAllProductType),
            description: '添加产品分类',
            args: {
                typeName: { type: GraphQLString },
            },
            resolve: async function (source, { typeName }) {
                // 查询用户名注册没
                if (typeName !== '') {
                    return await searchSql($sql.queryEndProductTypeByName, [typeName])
                        .then(async (reslut) => {
                            if (reslut.length === 0) {
                                // 新增产品
                                return await searchSql($sql.insertEndProductType, [typeName])
                                    .then(async (resluts) => {
                                        // 查询产品是否添加成功
                                        return await searchSql($sql.queryEndProductTypeById, [resluts.id]).then(async (reslutData) => {
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
                } else {
                    // 传参为空
                    reslutData = [{}];
                    reslutData[0].state = 3;
                    return await reslutData;
                }
            }
        },
        // 更新产品分类
        updateProductType: {
            type: new GraphQLList(queryAllProductType),
            description: '编辑产品分类',
            args: {
                id: { type: GraphQLInt },
                typeName: { type: GraphQLString },
            },
            resolve: async function (source, { id, typeName }) {
                console.log(id, typeName)
                if (typeName !== '' && id !== '') {
                    // 查询产品是否存在
                    return await searchSql($sql.queryEndProductTypeById, [id])
                        .then(async (reslut) => {
                            console.log(reslut)
                            if (reslut.length === 1) {
                                // 修改产品信息
                                return await searchSql($sql.updateEndProductTypeById, [typeName, id])
                                    .then(async (resluts) => {
                                        // 查询修改后的产品
                                        return await searchSql($sql.queryEndProductTypeById, [id]).then(async (reslutData) => {
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
                } else {
                    // 传参为空
                    reslutData = [{}];
                    reslutData[0].state = 3;
                    return await reslutData;
                }

            }
        },
        // 删除产品分类
        deleteProductType: {
            type: DeleteProductType,
            description: '删除产品分类',
            args: {
                id: { type: GraphQLID }
            },
            resolve: async function (source, { id }) {
                // 查询用户名注册没
                return await searchSql($sql.queryEndProductTypeById, [id])
                    .then(async (reslut) => {
                        console.log(reslut.length)
                        if (reslut.length === 1) {
                            // 删除产品
                            return await searchSql($sql.deleteEndProductType, [id])
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
        searchProductType: {
            type: new GraphQLList(queryAllProductType),
            description: '根据条件进行产品分类搜索',
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
                    return await searchSql(`SELECT * FROM productType WHERE ${type} like ${JSON.stringify(value)} ORDER BY ${type} ${sort} limit ${start},${pageSize}`)
                        .then(async (reslut) => {
                            return reslut;
                        })
                }
                else {
                    return await searchSql(`SELECT * FROM productType limit ${start},${pageSize}`)
                        .then(async (reslut) => {
                            return reslut;
                        })
                }
            }
        },

        // 搜索的总数
        totalProductType: {
            type: PorductTypeTotal,
            description: '获取产品分类总数',
            args: {
                value: { type: GraphQLString },
                intvalue: { type: GraphQLInt },
                type: { type: GraphQLString }
            },
            resolve: async function (source, { intvalue, value, type }) {
                console.log(intvalue, value, type)
                if (type === "" || value === "") {
                    return await searchSql($sql.countAllProductType)
                        .then(async (reslut) => {
                            console.log(1, reslut);
                            return await reslut[0];
                        })
                } else {
                    console.log(`SELECT count(*) as total FROM productType WHERE ${type} like %${value}%`)
                    return await searchSql(`SELECT count(*) as total FROM productType WHERE ${type} like ?`, [`%${value}%`])
                        .then(async (reslut) => {
                            console.log(2, reslut);
                            return await reslut[0];
                        })
                }

            }
        },

        // 校验分类名称
        validateTypeName: {
            type: DeleteProductType,
            description: '校验分类名称',
            args: {
                typeName: { type: GraphQLString },
            },
            resolve: async function (source, { typeName }) {
                // 查询用户名注册没
                if (typeName !== '') {
                    return await searchSql($sql.queryEndProductTypeByName, [typeName])
                        .then(async (reslut) => {
                            if (reslut.length === 1) {
                                // 已有用户
                                reslutData = {};
                                reslutData.state = 0;
                                return await reslutData;
                            } else {
                                // 已有用户
                                reslutData = {};
                                reslutData.state = 1;
                                return await reslutData;
                            }
                        })
                } else {
                    // 传参为空
                    reslutData = {};
                    reslutData.state = 3;
                    return await reslutData;
                }

            }
        },
    }
};