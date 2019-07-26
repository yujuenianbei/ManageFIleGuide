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

const queryGoodsResInfoByUserName = new GraphQLObjectType({
    name: 'queryGoodsResInfoByUserName',
    description: "查询所有用户",
    fields: () => {
        return ({
            id: {
                type: GraphQLID, resolve(data) {
                    return data.id;
                }
            },
            userName: {
                type: GraphQLString, resolve(data) {
                    return data.userName;
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

// 查询用户购物车内容
const QueryPorductsInOrder = new GraphQLObjectType({
    name: 'QueryPorductsInOrder',
    description: "查询订单中产品",
    fields: () => {
        return ({
            id: {
                type: GraphQLInt, resolve(data) {
                    return data.id;
                }
            },
            productName: {
                type: GraphQLString, resolve(data) {
                    return data.productName;
                }
            },
            type: {
                type: GraphQLInt, resolve(data) {
                    return data.type;
                }
            },
            img: {
                type: GraphQLString, resolve(data) {
                    return data.img;
                }
            },
            promotionMessage: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessage;
                }
            },
            features: {
                type: GraphQLString, resolve(data) {
                    return data.features;
                }
            },
            promotionMessageSecond: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessageSecond;
                }
            },
            usedPrice: {
                type: GraphQLInt, resolve(data) {
                    return data.usedPrice;
                }
            },
            nowPrice: {
                type: GraphQLInt, resolve(data) {
                    return data.nowPrice;
                }
            },
            updateTime: {
                type: GraphQLInt, resolve(data) {
                    return data.updateTime;
                }
            }
        });
    },
});

// 写入总价
async function data(fullPrice, listId, listNum) {
    var inlist = '';
    for (var i = 0; i < listId.length; i++) {
        if (i === listId.length - 1) {
            inlist += listId[i];
        } else {
            inlist += listId[i] + ',';
        }
    }
    await searchSql(`SELECT * FROM product WHERE id in (${inlist})`).then(result => {
        // console.log(result)
        result.map((item, index) => {
            fullPrice += item.nowPrice * listNum[index]
        })
        return fullPrice
    })
    return await fullPrice
}

// 写入购物车产品

async function addProductInOrderProducts(orderOdd, productList) {
    var data = [];
    for (var item = 0; item < productList.length; item++) {
        await searchSql($sql.addOrderProducts, [orderOdd.hex, productList[item].id, productList[item].num]).then(orderProduct => {
            data.push(orderProduct.id)
        })
    }
    return await data
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
        queryGoodsResInfoByUserName: {
            type: new GraphQLList(queryGoodsResInfoByUserName),
            description: '根据用户登录Email查询收货地址',
            args: {
                userName: { type: GraphQLString },
            },
            resolve: async function (source, { userName }) {
                return await searchSql($sql.quertGoodsResInfoByUserName, [userName])
                    .then((result) => {
                        // console.log(result)
                        if (result.length > 0) {
                            return result
                        } else {
                            return []
                        }
                    })
            }
        },
        queryProductInOrder: {
            type: new GraphQLList(QueryPorductsInOrder),
            description: '获取用户订单中的产品',
            args: {
                id: { type: GraphQLString },
            },
            resolve: async function (source, { id }) {
                const ids = JSON.parse(id);
                console.log(ids)
                var inlist = '';
                for (var i = 0; i < ids.length; i++) {
                    if (i === ids.length - 1) {
                        inlist += ids[i];
                    } else {
                        inlist += ids[i] + ',';
                    }
                }
                return await searchSql(`SELECT * FROM product WHERE id in (${inlist})`).then(result => {
                    console.log(result);
                    return result
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
                    listNum.push(item.num);
                    return listId, listNum
                })
                let fullPrice = 0;
                const orderState = 2;

                return await data(fullPrice, listId, listNum).then(async (fullPrice) => {
                    return await addProductInOrderProducts(orderOdd, pros).then(async (orderProductsItem) => {
                        // 生成订单
                        return await searchSql($sql.addOrder, [orderOdd.hex, email, payMethod, payState, payTime, deliveryMethod, deliveryHopeTime, expressOdd, goodsResAddress, JSON.stringify(orderProductsItem), fullPrice, orderState])
                            .then(async (result) => {
                                // 查询订单是否生成
                                return await searchSql($sql.queryOrder, [result.id])
                                    .then(async (results) => {
                                        if (results.length > 0) {
                                            // 通过email查询购物车中的信息
                                            return await searchSql($sql.queryUserCartIdByEmail, [email]).then(async (resq) => {
                                                var inlist = '';
                                                for (var i = 0; i < listId.length; i++) {
                                                    if (i === listId.length - 1) {
                                                        inlist += listId[i];
                                                    } else {
                                                        inlist += listId[i] + ',';
                                                    }
                                                }
                                                // 删除购物车中对应的产品
                                                return await searchSql(`DELETE FROM cartItem WHERE productId in (${inlist}) and cartId=${resq[0].cartId}`).then(async (resd) => {
                                                    // 查询是否删除成功
                                                    return await searchSql($sql.queryProductInCartItems, [resq[0].cartId, inlist]).then(async (resds) => {
                                                        if (resds.length === 0) {
                                                            results[0].state = 1;
                                                            return results[0]
                                                        } else {
                                                            return { state: 0 }
                                                        }
                                                    })
                                                })
                                            })
                                        } else {
                                            return { state: 0 }
                                        }
                                    })
                            })
                    })
                });
            }
        },
    }
};