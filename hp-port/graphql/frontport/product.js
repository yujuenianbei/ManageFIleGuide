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


// 查询用户购物车内容
const QueryPorducts = new GraphQLObjectType({
    name: 'QueryPorducts',
    description: "查询分页产品",
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

// 查询产品详情
const QueryPorduct = new GraphQLObjectType({
    name: 'QueryPorduct',
    description: "查询产品详情",
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
            }
        });
    },
});

const QueryPorductsNum = new GraphQLObjectType({
    name: 'QueryPorductsNum',
    description: "查询分页产品",
    fields: () => {
        return ({
            count: {
                type: GraphQLInt, resolve(data) {
                    return data.count;
                }
            },
        })
    },
})

module.exports = {
    query: {
        queryProducts: {
            type: new GraphQLList(QueryPorducts),
            description: '查询分页产品',
            args: {
                start: { type: GraphQLInt },
                size: { type: GraphQLInt }
            },
            resolve: async function (source, { start, size }) {
                return await searchSql($sql.queryProductByPage, [start, size])
                    .then(async (result) => {
                            return await result
                    })
            }
        },
        queryProduct: {
            type: new GraphQLList(QueryPorduct),
            description: '查询产品详情',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async function (source, { id }) {
                return await searchSql($sql.queryProductInfo, [id])
                    .then(async (result) => {
                            return await result
                    })
            }
        },
        queryProductNum: {
            type: new GraphQLList(QueryPorductsNum),
            description: '查询产品总数',
            resolve: async function (source){
                return await searchSql($sql.queryProductNum).then(async (result) => {
                    return await result
                })
            }
        }
    },
    mutation: {

    }
};