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


module.exports = {
    query: {
        // queryAllUsers:{
        //     type: new GraphQLList(QueryAllUser),
        //     description: '获取全部用户信息',
        //     resolve: async function () {
        //         return await searchSql($sql.queryAllUser);
        //     }
        // }
    },
    mutation: {
        queryGoodsResInfoByEmail:{
            type: new GraphQLList(GoodsResInfoByEmail),
            description: '根据用户登录Email查询收货地址',
            args: {
                email: { type: GraphQLString },
            },
            resolve: async function (source, { email }) {
                return await searchSql($sql.quertGoodsResInfoByEmail, [email])
                    .then((result) => {
                        console.log(result)
                        if(result.length > 0){
                            return result
                        } else {
                            return []
                        }
                    })
            }
        },
    }
};