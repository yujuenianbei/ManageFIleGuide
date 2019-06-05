const jwt = require('jsonwebtoken')
const $sql = require('../../dao/userSqlMapping');
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
function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}

//定义schema及resolver
const Cart = new GraphQLObjectType({
    name: 'Cart',
    description: "购物车",
    fields: () => {
        return ({
            userId: {
                type: GraphQLInt, resolve(data) {
                    return data.userId;
                }
            },
            cartId: {
                type: GraphQLInt, resolve(data) {
                    return data.cartId;
                }
            },
            productId: {
                type: GraphQLInt, resolve(data) {
                    return data.productId;
                }
            },
            productNum: {
                type: GraphQLInt, resolve(data) {
                    return data.productNum;
                }
            },
            token: {
                type: GraphQLString, resolve(data) {
                    return data.token;
                }
            }
        });
    },
});

const RemoveCart = new GraphQLObjectType({
    name: 'RemoveCart',
    description: "清空购物车",
    fields: () => {
        return ({
            userId: {
                type: GraphQLInt, resolve(data) {
                    return data.userId;
                }
            },
            token: {
                type: GraphQLString, resolve(data) {
                    return data.token;
                }
            },
            state: {
                type: GraphQLString, resolve(data) {
                    return data.state;
                } 
            }
        });
    },
});

module.exports = {
    query: {

    },
    mutation: {
        addToCart: {
            type: new GraphQLList(Cart),
            description: '新增购物车',
            args: {
                userId: { type: GraphQLInt },
                productId: { type: GraphQLInt },
                productNum: { type: GraphQLInt },
            },
            resolve: async function (source, { userId, productId, productNum }) {
                return await searchSql($sql.queryCartUser, [userId])
                    .then((result) => {
                        // 用户没有购物车信息
                        if (result.length === 0) {
                            var cartId = RndNum(8)
                            // 创建用户和购物车对应关系
                            return searchSql($sql.createCart, [userId, cartId])
                                .then(() => {
                                    // 创建商品购物车对应关系
                                    return searchSql($sql.createCartItem, [cartId, productId, productNum]).then(() => {
                                        // 查询购物车中某个产品内容
                                        return searchSql($sql.queryCartProductNum, [productId, cartId])
                                    })
                                })
                        } else {
                            // 查询购物车内是否有这个产品
                            return searchSql($sql.queryProductInCartItem, [result[0].cartId, productId])
                                .then((resultData) => {
                                    // 购物车中有此商品
                                    if (resultData.length > 0) {
                                        // 更新购物车内某个产品的数量
                                        return searchSql($sql.updateProductInCartItem, [productNum, result[0].cartId, productId]).then((res) => {
                                            // 查询购物车中某个产品内容
                                            return searchSql($sql.queryCartProductNum, [productId, result[0].cartId])
                                        });
                                    } else {
                                        // 创建购物车和产品对应关系
                                        return searchSql($sql.createCartItem, [result[0].cartId, productId, productNum]).then((res) => {
                                            // 查询购物车中某个产品内容
                                            return searchSql($sql.queryCartProductNum, [productId, result[0].cartId])
                                        });
                                    }
                                })
                        }
                    })
            }
        },
        removeCart: {
            type: new GraphQLList(RemoveCart),
            description: '清空购物车',
            args: {
                userId: { type: GraphQLInt },
            },
            resolve: async function (source, { userId }) {
                return await searchSql($sql.queryCartUser, [userId])
                    .then(async(result) => {
                       if(result.length > 0){
                        return await searchSql($sql.deleteCartIdCartItem, [result[0].cartId]).then(async()=>{
                            return await searchSql($sql.deleteUserIdCart, [result[0].cartId]).then(async(result)=>{
                                return await {
                                    state: 1,
                                    userId: userId
                                }
                            })
                        })  
                       }
                    })
            }
        },
    }
};