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
            },
            token: {
                type: GraphQLString, resolve(data) {
                    return data.token;
                }
            },
            id: {
                type: GraphQLID, resolve(data) {
                    return data.id;
                }
            },
            uuid: {
                type: GraphQLString, resolve(data) {
                    return data.uuid;
                }
            },
        });
    },
});

const Reg = new GraphQLObjectType({
    name: 'Reg',
    description: "用户注册",
    fields: () => {
        return ({
            // 这种可以
            uuid: {
                type: GraphQLInt, resolve(data) {
                    return data.uuid;
                }
            },
            uid: {
                type: GraphQLInt, resolve(data) {
                    return data.uid;
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
            userName: {
                type: GraphQLString, resolve(data) {
                    return data.userName;
                }
            },
            sex: {
                type: GraphQLInt, resolve(data) {
                    return data.sex;
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
            password: {
                type: GraphQLString, resolve(data) {
                    return data.password;
                }
            },
            company: {
                type: GraphQLString, resolve(data) {
                    return data.company;
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


const LoginUuid = new GraphQLObjectType({
    name: 'LoginUuid',
    description: "用户uuid登录",
    fields: () => {
        return ({
            // 这种可以
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
            uuid: {
                type: GraphQLString, resolve(data) {
                    return data.uuid;
                }
            },
            state: {
                type: GraphQLString, resolve(data) {
                    return data.state;
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

const QueryAllUser = new GraphQLObjectType({
    name: 'QueryAllUser',
    description: "查询所有用户",
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
            phonecode: {
                type: GraphQLInt, resolve(data) {
                    return data.phonecode;
                }
            },
            phone: {
                type: GraphQLString, resolve(data) {
                    return data.phone;
                }
            },
            password: {
                type: GraphQLString, resolve(data) {
                    return data.password;
                }
            },
            company: {
                type: GraphQLString, resolve(data) {
                    return data.company;
                }
            }
        });
    },
});


module.exports = {
    query: {
        queryAllUsers: {
            type: new GraphQLList(QueryAllUser),
            description: '获取全部后台用户信息',
            resolve: async function () {
                return await searchSql($sql.queryAllEndUser);
            }
        }
    },
    mutation: {
        loginUuid: {
            type: new GraphQLList(LoginUuid),
            description: '后台用户登录',
            args: {
                uuid: { type: GraphQLString },
            },
            resolve: async function (source, { uuid, state }) {
                return await searchSql($sql.queryUserUid, [uuid])
                    .then((reslut) => {
                        console.log(reslut)
                        if (reslut) {
                            // 更新用户最后登录时间
                            const curTime = new Date();
                            let portDate = curTime.setHours(curTime.getHours() + 8);
                            console.log(new Date(portDate))
                            searchSql($sql.updateUserLoginTime, [new Date(portDate), reslut[0].id])
                            // 密钥
                            const secret = 'ILOVENINGHAO'
                            const payload = {
                                name: reslut[0].name.username,
                                admin: true
                            }
                            const token = jwt.sign(payload, secret, { expiresIn: '1day' })
                            reslut[0].state = 1;
                            reslut[0].token = token
                        } else {
                            reslut[0].state = 2
                            reslut[0].token = null
                        }
                        return reslut
                    })
            }
        },
        login: {
            type: new GraphQLList(Login),
            description: '后台用户登录',
            args: {
                email: { type: GraphQLString },
                name: { type: GraphQLString },
                password: { type: GraphQLString },
                state: { type: GraphQLString },
            },
            resolve: async function (source, { name, password, state }) {
                return await searchSql($sql.queryByUsername, [name])
                    .then((reslut) => {
                        console.log(reslut)
                        if (password === reslut[0].password) {
                            // 更新用户最后登录时间
                            const curTime = new Date();
                            let portDate = curTime.setHours(curTime.getHours() + 8);
                            console.log(new Date(portDate))
                            searchSql($sql.updateUserLoginTime, [new Date(portDate), reslut[0].id])
                            // 密钥
                            const secret = 'ILOVENINGHAO'
                            const payload = {
                                name: name.username,
                                admin: true
                            }
                            const token = jwt.sign(payload, secret, { expiresIn: '1day' })
                            reslut[0].state = 1;
                            reslut[0].token = token
                        } else {
                            reslut[0].state = 2
                            reslut[0].token = null
                        }
                        return reslut
                    })
                // return (await searchSql($sql.queryByUsername, [name]));
            }
        },
        regAccount: {
            type: new GraphQLList(Reg),
            description: '后台用户注册',
            args: {
                userName: { type: GraphQLString },
                sex: { type: GraphQLInt },
                email: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                phoneCode: { type: GraphQLInt },
                phone: { type: GraphQLString },
                password: { type: GraphQLString },
                company: { type: GraphQLString }
            },
            resolve: async function (source, { userName, sex, email, firstName, lastName, phoneCode, phone, password, company }) {
                return await searchSql($sql.queryEndUserByUserName, [userName])
                    .then(async (reslut) => {
                        if (reslut.length === 0) {
                            return await searchSql($sql.insertEndUser, [userName, sex, email, firstName, lastName, phoneCode, phone, password, company])
                                .then(async (resluts) => {
                                    return await searchSql($sql.queryEndUserById, [resluts.id]).then(async (reslutData) => {
                                        reslutData[0].state = 1;
                                        return await reslutData;
                                    });
                                })
                        } else {
                            reslutData = [{}];
                            reslutData[0].state = 0;
                            return await reslutData;
                        }
                    })
            }
        },
    }
};