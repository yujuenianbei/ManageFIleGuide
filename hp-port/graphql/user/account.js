var $sql = require('../../dao/userSqlMapping');
var { searchSql } = require("../../sql/init")
var {
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
const Login = new GraphQLObjectType({
    name: 'Login',
    description: "用户登录",
    fields: () => {
        return ({
            // 这种可以
            email: {
                type: GraphQLString, resolve(data) {
                    return data.email;
                }
            },
            name: {
                type: GraphQLString, resolve(data) {
                    return data.name;
                }
            },
            password: {
                type: GraphQLString, resolve(data) {
                    return data.password;
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

const ProductListInfoOne = new GraphQLObjectType({
    name: 'ProductInfo',
    description: "ProductInfo",
    fields: () => {
        return ({
            // 这种可以
            id: {
                type: GraphQLInt, resolve(data) {
                    return data.id;
                }
            },
            link: {
                type: GraphQLString, resolve(data) {
                    return data.link;
                }
            },
            img: {
                type: GraphQLString, resolve(data) {
                    return data.img;
                }
            },
            productName: {
                type: GraphQLString, resolve(data) {
                    return data.productName;
                }
            },
            promotionMessage: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessage;
                }
            },
            featrues: {
                // 返回数组
                type: new GraphQLList(GraphQLString), resolve(data) {
                    return data.featrues;
                }
            },
            promotionMessageSecond: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessageSecond;
                }
            },
            usedPrice: {
                type: GraphQLString, resolve(data) {
                    return data.usedPrice;
                }
            },
            nowPrice: {
                type: GraphQLString, resolve(data) {
                    return data.nowPrice;
                }
            }
        });
    },
});



const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    description: "用户信息Input实体",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        sex: { type: GraphQLString },
        intro: { type: GraphQLString },
    }),
});

module.exports = {
    query: {
        login: {
            type: new GraphQLList(Login),
            description: '用户登录',
            args: {
                email: { type: GraphQLString },
                name: { type: GraphQLString },
                password: { type: GraphQLString },
                state: { type: GraphQLString }
            },
            resolve: async function (source, { name, password, state }) {
                return await searchSql($sql.queryByUsername, [name])
                .then((reslut)=>{
                    if(password === reslut[0].password){
                        reslut[0].state = 1
                    } else {
                        reslut[0].state = 2
                    }
                    return reslut
                })
                // return (await searchSql($sql.queryByUsername, [name]));
            }
        },
    },
    mutation: {

    }
};