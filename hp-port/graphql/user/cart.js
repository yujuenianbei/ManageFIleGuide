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
            productId: {
                type: GraphQLString, resolve(data) {
                    return data.productId;
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

module.exports = {
    query: {
        
    },
    mutation: {
        addToCart: {
            type: new GraphQLList(Cart),
            description: '新增购物车',
            args: {
                userId: { type: GraphQLInt },
                productId: { type: GraphQLString },
            },
            resolve: async function (source, { userId, productId }) {
                return await searchSql($sql.searchCartUser, [userId])
                    .then((result) => {
                        console.log(result)
                        if(result.length === 0){
                            return searchSql($sql.addCart, [userId, productId])
                            .then(() => {
                                return searchSql($sql.searchCartUser, [userId]);
                            })
                        } else {
                            return searchSql($sql.updateCart, [productId, userId])
                            .then(() => {
                                return searchSql($sql.searchCartUser, [userId]);
                            })
                        }
                    })
            }
        },
        // reg: {
        //     type: new GraphQLList(Reg),
        //     description: '用户登录',
        //     args: {
        //         name: { type: GraphQLString },
        //         email: { type: GraphQLString },
        //         phonecode: { type: GraphQLInt },
        //         phone: { type: GraphQLString },
        //         password: { type: GraphQLString },
        //         state: { type: GraphQLString }
        //     },
        //     resolve: async function (source, { name, email, phonecode, phone, password, state }) {
        //         return await searchSql($sql.insertUser, [name, email, phonecode, phone, password])
        //             .then((reslut) => {
        //                 console.log(reslut)
        //                 // if(password === reslut[0].password){
        //                 //     reslut[0].state = 1
        //                 // } else {
        //                 //     reslut[0].state = 2
        //                 // }
        //                 // return reslut
        //             })
        //         // return (await searchSql($sql.queryByUsername, [name]));
        //     }
        // },
    }
};