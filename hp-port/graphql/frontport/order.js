const jwt = require('jsonwebtoken');
var UUID = require('uuid-js');
const $sql = require('../../dao/userSqlMapping');
const { searchSql } = require("../../sql/init");
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

const GoodsResInfoByEmail = new GraphQLObjectType({
    name: 'GoodsResInfoByEmail',
    description: "查询所有用户",
    fields: () => {
        return ({
            id: {
                type: GraphQLID, resolve(data) {
                    return data.id;
                }
            },
            email: {
                type: GraphQLString, resolve(data) {
                    return data.email;
                }
            },
            firstName: {
                type: GraphQLString, resolve(data) {
                    return data.firstName;
                }
            },
            lastName: {
                type: GraphQLString, resolve(data) {
                    return data.lastName;
                }
            },
            phoneCode: {
                type: GraphQLInt, resolve(data) {
                    return data.phoneCode;
                }
            },
            phone: {
                type: GraphQLString, resolve(data) {
                    return data.phone;
                }
            },
            province: {
                type: GraphQLString, resolve(data) {
                    return data.province;
                }
            },
            address: {
                type: GraphQLString, resolve(data) {
                    return data.address;
                }
            },
            postCode: {
                type: GraphQLInt, resolve(data) {
                    return data.postCode;
                }
            },
            createTime: {
                type: GraphQLString, resolve(data) {
                    return data.createTime;
                }
            },
            updateTime: {
                type: GraphQLString, resolve(data) {
                    return data.updateTime;
                }
            },
        });
    },
});
const getMethod = new GraphQLObjectType({
    name: 'getMethod',
    description: "获取各种method",
    fields: () => {
        return ({
            id: {
                type: GraphQLID, resolve(data) {
                    return data.id;
                }
            },
            name: {
                type: GraphQLString, resolve(data) {
                    return data.name;
                }
            },
            createTime: {
                type: GraphQLString, resolve(data) {
                    return data.createTime;
                }
            },
            updateTime: {
                type: GraphQLString, resolve(data) {
                    return data.updateTime;
                }
            },
        });
    },
});

const addOrders = new GraphQLObjectType({
    name: 'addOrders',
    description: "订单信息",
    fields: () => {
        return ({
            id: {
                type: GraphQLID, resolve(data) {
                    return data.id;
                }
            },
            orderOdd: {
                type: GraphQLString, resolve(data) {
                    return data.orderOdd;
                }
            },
            email: {
                type: GraphQLString, resolve(data) {
                    return data.email;
                }
            },
            payMethod: {
                type: GraphQLInt, resolve(data) {
                    return data.payMethod;
                }
            },
            payState: {
                type: GraphQLInt, resolve(data) {
                    return data.payState;
                }
            },
            payTime: {
                type: GraphQLString, resolve(data) {
                    return data.payTime;
                }
            },
            deliveryMethod: {
                type: GraphQLInt, resolve(data) {
                    return data.deliveryMethod;
                }
            },
            deliveryHopeTime: {
                type: GraphQLString, resolve(data) {
                    return data.deliveryHopeTime;
                }
            },
            expressOdd: {
                type: GraphQLString, resolve(data) {
                    return data.expressOdd;
                }
            },
            goodsResAddress: {
                type: GraphQLInt, resolve(data) {
                    return data.goodsResAddress;
                }
            },
            productList: {
                type: GraphQLString, resolve(data) {
                    return data.productList;
                }
            },
            fullPrice: {
                type: GraphQLInt, resolve(data) {
                    return data.fullPrice;
                }
            },
            orderState: {
                type: GraphQLInt, resolve(data) {
                    return data.orderState;
                }
            },
            createTime: {
                type: GraphQLString, resolve(data) {
                    return data.createTime;
                }
            },
            updateTime: {
                type: GraphQLString, resolve(data) {
                    return data.updateTime;
                }
            },
            state: {
                type: GraphQLInt, resolve(data) {
                    return data.state;
                }
            }
        });
    },
});

async function data(fullPrice, listId, listNum) {
    var inlist = '';
    for (var i = 0; i < listId.length; i++) {
        if (i === listId.length - 1) {
            inlist += listId[i];
        } else {
            inlist += listId[i] + ',';
        }
    }
    await searchSql(`SELECT nowPrice FROM product WHERE id in (${inlist})`).then(result => {
        console.log(result)
        result.map((item, index) => {
            fullPrice += item.nowPrice * listNum[index]
        })
        return fullPrice
    })
    return await fullPrice
}

module.exports = {
    query: {
        queryPayMethod: {
            type: new GraphQLList(getMethod),
            description: '获取支付方式',
            resolve: async function () {
                return await searchSql($sql.queryAllPayMethod);
            }
        },
        queryDeliveryMethod: {
            type: new GraphQLList(getMethod),
            description: '获取配送',
            resolve: async function () {
                return await searchSql($sql.queryAllDeliveryMethod);
            }
        }
    },
    mutation: {
        queryGoodsResInfoByEmail: {
            type: new GraphQLList(GoodsResInfoByEmail),
            description: '根据用户登录Email查询收货地址',
            args: {
                email: { type: GraphQLString },
            },
            resolve: async function (source, { email }) {
                return await searchSql($sql.quertGoodsResInfoByEmail, [email])
                    .then((result) => {
                        console.log(result)
                        if (result.length > 0) {
                            return result
                        } else {
                            return []
                        }
                    })
            }
        },
        addUserOrder: {
            type: addOrders,
            description: '用户创建订单',
            args: {
                email: { type: GraphQLString },
                payMethod: { type: GraphQLInt },
                deliveryMethod: { type: GraphQLInt },
                deliveryHopeTime: { type: GraphQLString },
                goodsResAddress: { type: GraphQLInt },
                productList: { type: GraphQLString },
            },
            resolve: async function (source, { email, payMethod, deliveryMethod, deliveryHopeTime, goodsResAddress, productList }) {
                // 根据日期生成订单号
                const date = new Date().getTime();
                const orderOdd = UUID.fromTime(date, true)
                const payState = 0;
                const payTime = null;
                const expressOdd = null;
                const pros = JSON.parse(productList);
                let listId = [];
                let listNum = [];
                pros.map(item => {
                    listId.push(item.id);
                    listNum.push(item.number);
                    return listId, listNum
                })
                let fullPrice = 0;
                const orderState = 2;

                return await data(fullPrice, listId, listNum).then(async (fullPrice) => {
                    // console.log(orderOdd.hex, payMethod, payState, payTime, deliveryMethod, deliveryHopeTime, expressOdd, goodsResAddress, productList, fullPrice, orderState)
                    return await searchSql($sql.addOrder, [orderOdd.hex, email, payMethod, payState, payTime, deliveryMethod, deliveryHopeTime, expressOdd, goodsResAddress, productList, fullPrice, orderState])
                        .then(async (result) => {
                            return await searchSql($sql.queryOrder, [result.id])
                                .then((results) => {
                                    console.log(results, result.id)
                                    if (results.length > 0) {
                                        results[0].state = 1;
                                        return results[0]
                                    } else {
                                        return [{ state: 0 }]
                                    }
                                })
                        })
                });
            }
        },
    }
};