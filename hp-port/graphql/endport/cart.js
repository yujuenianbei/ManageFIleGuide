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
const { QueryAllCart, CartItemTotal } = require('./cartSchema');

module.exports = {
    query: {
        // // 查询所有的用户
        // queryAllCart: {
        //     type: new GraphQLList(QueryAllCart),
        //     description: '获取全部后台用户信息',
        //     resolve: async function () {
        //         let data = []
        //         return await searchSql($sql.queryAllProductInCart)
        //         .then(async (result) => {
        //             console.log(result)
        //             return result
        //         })
        //     }
        // }
    },
    mutation: {
        searchCart: {
            type: new GraphQLList(QueryAllCart),
            description: '根据条件搜索用户购物车',
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
                    console.log($sql.queryAllProductInCart + ` ${type} like ${JSON.stringify(value)} ORDER BY ${type} ${sort} limit ${start},${pageSize}`)
                    value = '%' + value + '%'
                    return await searchSql($sql.queryAllProductInCart + `${type} like ${JSON.stringify(value)} ORDER BY ${type} ${sort} limit ${start},${pageSize}`)
                        .then(async (reslut) => {
                            return reslut;
                        })
                }
                else {
                    console.log($sql.queryAllProductInCart + ` limit ${start},${pageSize}`)
                    return await searchSql($sql.queryAllProductInCart + ` limit ${start},${pageSize}`)
                        .then(async (reslut) => {
                            return reslut;
                        })
                }
            }
        },
        // 搜索的总数
        totalCartItem: {
            type: CartItemTotal,
            description: '根据条件进行搜索',
            args: {
                value: { type: GraphQLString },
                intvalue: { type: GraphQLInt },
                type: { type: GraphQLString }
            },
            resolve: async function (source, { intvalue, value, type }) {
                console.log(intvalue, value, type)
                // if (type === "" || value === "") {
                    return await searchSql($sql.searchAllCart)
                        .then(async (reslut) => {
                            console.log(1, reslut);
                            return await reslut[0];
                        })
                // } else {
                //     console.log(`SELECT count(*) as total FROM product WHERE ${type} like %${value}%`)
                //     return await searchSql(`SELECT count(*) as total FROM product WHERE ${type} like ?`, [`%${value}%`])
                //         .then(async (reslut) => {
                //             console.log(2, reslut);
                //             return await reslut[0];
                //         })
                // }

            }
        },
    }
};