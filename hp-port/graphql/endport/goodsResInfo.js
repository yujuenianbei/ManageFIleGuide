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
const { UserGoodsResAddress } = require('./goodsResInfoSchema');

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
        // searchOrder: {
        //     type: new GraphQLList(QueryAllOrder),
        //     description: '根据条件搜索用户订单',
        //     args: {
        //         value: { type: GraphQLString },
        //         intvalue: { type: GraphQLInt },
        //         type: { type: GraphQLString },
        //         start: { type: GraphQLInt },
        //         pageSize: { type: GraphQLInt },
        //         sort: { type: GraphQLString }  //ASC DEC
        //     },
        //     resolve: async function (source, { intvalue, value, type, start, pageSize, sort }) {
        //         console.log(intvalue, value, type, start, pageSize, sort)
        //         // type 没选 全局搜
        //         if (type !== '' && value !== '') {
        //             console.log($sql.queryAllOrderInOrders + `AND ${type} like ${JSON.stringify(value)} ORDER BY orderOdd ${sort} limit ${start},${pageSize}`)
        //             value = '%' + value + '%'
        //             return await searchSql($sql.queryAllOrderInOrders + `AND ${type} like ${JSON.stringify(value)} ORDER BY orderOdd ${sort} limit ${start},${pageSize}`)
        //                 .then(async (reslut) => {
        //                     return reslut;
        //                 })
        //         }
        //         else if (type !== '') {
        //             console.log($sql.queryAllOrderInOrders + `ORDER BY orderOdd ${sort} limit ${start},${pageSize}`)
        //             return await searchSql($sql.queryAllOrderInOrders + `ORDER BY orderOdd ${sort} limit ${start},${pageSize}`)
        //                 .then(async (reslut) => {
        //                     return reslut;
        //                 })
        //         } else if (type == '') {
        //             console.log(11)
        //             console.log($sql.queryAllOrderInOrders + `ORDER BY orderOdd ${sort} limit ${start},${pageSize}`)
        //             return await searchSql($sql.queryAllOrderInOrders + `ORDER BY orderOdd ${sort} limit ${start},${pageSize}`)
        //                 .then(async (reslut) => {
        //                     console.log(reslut)
        //                     return reslut;
        //                 })
        //         }
        //     }
        // },
        // // 搜索的总数
        // totalOrderItem: {
        //     type: OrderItemTotal,
        //     description: '根据条件进行搜索',
        //     args: {
        //         value: { type: GraphQLString },
        //         intvalue: { type: GraphQLInt },
        //         type: { type: GraphQLString }
        //     },
        //     resolve: async function (source, { intvalue, value, type }) {
        //         console.log(intvalue, value, type)
        //         if (type === "" || value === "") {
        //             return await searchSql($sql.searchAllOrders)
        //                 .then(async (reslut) => {
        //                     console.log(1, reslut);
        //                     return await reslut[0];
        //                 })
        //         } else {
        //             console.log($sql.serachTypeOrders + `${type} like %${value}%`)
        //             return await searchSql($sql.serachTypeOrders + `${type} like ?`, [`%${value}%`])
        //                 .then(async (reslut) => {
        //                     console.log(2, reslut);
        //                     return await reslut[0];
        //                 })
        //         }

        //     }
        // },
        searchUserAddress: {
            type: new GraphQLList(UserGoodsResAddress),
            description: '查询某个用户的收货地址',
            args: {
                userName: { type: GraphQLString },
            },
            resolve: async function (source, { userName }) {
                // console.log(userName)
                return await searchSql($sql.searchUserAllAddress, [userName])
                    .then(async (reslut) => {
                        // console.log(reslut)
                        return reslut;
                    })
            }
        },
        regGoodsResInfo: {
            type: UserGoodsResAddress,
            description: '添加收货地址',
            args: {
                userName: { type: GraphQLString },
                email: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                phoneCode: { type: GraphQLInt },
                phone: { type: GraphQLString },
                province: { type: GraphQLString },
                address: { type: GraphQLString },
                postCode: { type: GraphQLInt },
            },
            resolve: async function (source, { email, userName, firstName, lastName, phoneCode, phone, province, address, postCode }) {
                // console.log(email, userName, firstName, lastName, phoneCode, phone, province, address, postCode)
                return await searchSql($sql.insertGoodsResInfo, [email, userName, firstName, lastName, phoneCode, phone, province, address, postCode])
                    .then(async (result) => {
                        // console.log(reslut)
                        return await searchSql($sql.queryGoodsResInfo, [result.id])
                            .then(async (results) => {
                                if(results.length > 0){
                                    results[0].state = 1
                                    return await results[0];
                                } else {
                                    let res;
                                    res.state = 0
                                    return await res;
                                }
                                
                            })
                    })
            }
        },
    }
};