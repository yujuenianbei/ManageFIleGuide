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
const AddCart = new GraphQLObjectType({
    name: 'AddCart',
    description: "添加购物车",
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

// 删除购物车
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

// 删除购物车中某个产品
const DeleteProductInCart = new GraphQLObjectType({
    name: 'DeleteProductInCart',
    description: "清空购物车",
    fields: () => {
        return ({
            userId: {
                type: GraphQLInt, resolve(data) {
                    return data.userId;
                }
            },
            productId: {
                type: GraphQLInt, resolve(data) {
                    return data.productId;
                }
            },
            token: {
                type: GraphQLString, resolve(data) {
                    return data.token;
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
const QueryCart = new GraphQLObjectType({
    name: 'QueryCart',
    description: "查询购物车",
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
                type: GraphQLInt, resolve(data) {
                    return data.state;
                }
            },
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
            productNum: {
                type: GraphQLInt, resolve(data) {
                    return data.productNum;
                }
            }
        });
    },
});

module.exports = {
    query: {
        queryUserCartProducts: {
            type: new GraphQLList(QueryCart),
            description: '查询购物车',
            args: {
                userId: { type: GraphQLInt },
            },
            resolve: async function (source, { userId }) {
                return await searchSql($sql.queryUserCartProductInfo, [userId])
                    .then(async (result) => {
                        if (result.length > 0) {
                            result.map((item) => {
                                item.state = 1
                                return item
                            })
                            return await result
                        } else {
                            var data = { state: 0 }
                            result.push(data)
                            return await result
                        }

                    })
            }
        },
    },
    mutation: {
        addToCart: {
            type: new GraphQLList(AddCart),
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
                            var cartId = RndNum(8);
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
        deleteAProductInCart: {
            type: new GraphQLList(DeleteProductInCart),
            description: '删除购物车中某个产品',
            args: {
                userId: { type: GraphQLInt },
                productId: { type: GraphQLInt }
            },
            resolve: async function (source, { userId, productId }) {
                return await searchSql($sql.queryCartUser, [userId])
                    .then(async(res)=>{
                        if(res.length > 0){
                            // console.log(productId,res,res[0].cartId)
                            return await searchSql($sql.deleteProductInCartItem, [productId, res[0].cartId])
                            .then(async (result) => {
                                if (!result.warningCount) {
                                    return await [
                                        {
                                            state: 1,
                                            productId: productId
                                        }]
                                } else {
                                    return await [
                                        {
                                            state: 0,
                                            productId: productId
                                        }]
                                }
                            })
                        } else {
                            return await [
                                {
                                    state: 0,
                                    productId: productId
                                }]
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
                    .then(async (result) => {
                        if (result.length > 0) {
                            return await searchSql($sql.deleteCartIdCartItem, [result[0].cartId]).then(async (cartItem) => {
                                if (!cartItem.warningCount) {
                                    return await searchSql($sql.deleteUserIdCart, [result[0].cartId]).then(async (cart) => {
                                        if (!dataresult.warningCount) {
                                            return await [
                                                {
                                                    state: 1,
                                                    userId: userId
                                                }]
                                        } else {
                                            return await [
                                                {
                                                    state: 0,
                                                    userId: userId
                                                }]
                                        }

                                    })
                                } else {
                                    return await [
                                        {
                                            state: 0,
                                            userId: userId
                                        }]
                                }
                            })
                        } else {
                            return await [
                                {
                                    state: 0,
                                    userId: userId
                                }]
                        }
                    })
            }
        },
    }
};