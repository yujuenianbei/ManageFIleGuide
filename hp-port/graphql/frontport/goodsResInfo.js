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
const GoodsResInfo = new GraphQLObjectType({
    name: 'GoodsResInfo',
    description: "用户登录",
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



module.exports = {
    query: {

    },
    mutation: {
        // loginUuid:{
        //     type: new GraphQLList(GoodsResInfo),
        //     description: '用户登录',
        //     args: {
        //         uuid: { type: GraphQLString },
        //     },
        //     resolve: async function (source, { uuid, state }) {
        //         return await searchSql($sql.queryUserUid, [uuid])
        //             .then((reslut) => {
        //                 console.log(reslut)
        //                 if (reslut) {
        //                     // 更新用户最后登录时间
        //                     const curTime = new Date();
        //                     let portDate = curTime.setHours(curTime.getHours() + 8);
        //                     console.log(new Date(portDate))
        //                     searchSql($sql.updateUserLoginTime, [new Date(portDate), reslut[0].id])
        //                     // 密钥
        //                     const secret = 'ILOVENINGHAO'
        //                     const payload = {
        //                         name: reslut[0].name.username,
        //                         admin: true
        //                     }
        //                     const token = jwt.sign(payload, secret, { expiresIn: '1day' })
        //                     reslut[0].state = 1;
        //                     reslut[0].token = token
        //                 } else {
        //                     reslut[0].state = 2
        //                     reslut[0].token = null
        //                 }
        //                 return reslut
        //             })
        //     }
        // },
        // login: {
        //     type: new GraphQLList(Login),
        //     description: '用户登录',
        //     args: {
        //         email: { type: GraphQLString },
        //         name: { type: GraphQLString },
        //         password: { type: GraphQLString },
        //         state: { type: GraphQLString },
        //     },
        //     resolve: async function (source, { name, password, state }) {
        //         return await searchSql($sql.queryByUsername, [name])
        //             .then((reslut) => {
        //                 console.log(reslut)
        //                 if (password === reslut[0].password) {
        //                     // 更新用户最后登录时间
        //                     const curTime = new Date();
        //                     let portDate = curTime.setHours(curTime.getHours() + 8);
        //                     console.log(new Date(portDate))
        //                     searchSql($sql.updateUserLoginTime, [new Date(portDate), reslut[0].id])
        //                     // 密钥
        //                     const secret = 'ILOVENINGHAO'
        //                     const payload = {
        //                         name: name.username,
        //                         admin: true
        //                     }
        //                     const token = jwt.sign(payload, secret, { expiresIn: '1day' })
        //                     reslut[0].state = 1;
        //                     reslut[0].token = token
        //                 } else {
        //                     reslut[0].state = 2
        //                     reslut[0].token = null
        //                 }
        //                 return reslut
        //             })
        //         // return (await searchSql($sql.queryByUsername, [name]));
        //     }
        // },
        regGoodsResInfo: {
            type: new GraphQLList(GoodsResInfo),
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
                console.log(email, userName, firstName, lastName, phoneCode, phone, province, address, postCode)
                return await searchSql($sql.insertGoodsResInfo, [email, userName, firstName, lastName, phoneCode, phone, province, address, postCode])
                    .then(async (reslut) => {
                        return await searchSql($sql.queryGoodsResInfo, [reslut.id])
                            .then(async (resluts) => {
                                return await resluts;
                            })
                    })
            }
        },
    }
};