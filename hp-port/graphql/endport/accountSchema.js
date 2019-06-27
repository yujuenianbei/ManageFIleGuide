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
            userName: {
                type: GraphQLString, resolve(data) {
                    return data.userName;
                }
            },
            password: {
                type: GraphQLString, resolve(data) {
                    return data.password;
                }
            },
            state: {
                type: GraphQLInt, resolve(data) {
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
            uid: {
                type: GraphQLString, resolve(data) {
                    return data.uid;
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


const UpdateAccount = new GraphQLObjectType({
    name: 'UpdateAccount',
    description: "更新用户信息",
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

// UUID登录
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
            id: {
                type: GraphQLID, resolve(data) {
                    return data.id;
                }
            },
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


const DeleteAcoount = new GraphQLObjectType({
    name: 'DeleteAcoount',
    description: "删除用户",
    fields: () => {
        return ({
            userName: {
                type: GraphQLString, resolve(data) {
                    return data.userName;
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


const ValidateAcoount = new GraphQLObjectType({
    name: 'ValidateAcoount',
    description: "验证用户名是否存在",
    fields: () => {
        return ({
            id: {
                type: GraphQLID, resolve(data) {
                    return data.id;
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

const SearchAccount = new GraphQLObjectType({
    name: 'SearchAccount',
    description: "查询符合条件的用户",
    fields: () => {
        return ({
            // 这种可以
            id: {
                type: GraphQLID, resolve(data) {
                    return data.id;
                }
            },
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
            },
        });
    },
});

const AccountTotal = new GraphQLObjectType({
    name: 'AccountTotal',
    description: "查询符合条件的用户总数",
    fields: () => {
        return ({
            total: {
                type: GraphQLInt, resolve(data) {
                    return data.total;
                }
            },
        });
    },
});

module.exports = { 
    Login, 
    Reg, 
    UpdateAccount, 
    LoginUuid, 
    QueryAllUser, 
    DeleteAcoount, 
    ValidateAcoount, 
    SearchAccount,
    AccountTotal
}