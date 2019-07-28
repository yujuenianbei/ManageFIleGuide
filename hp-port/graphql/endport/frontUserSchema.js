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

const RegFrontUser = new GraphQLObjectType({
    name: 'RegFrontUser',
    description: "前台用户注册",
    fields: () => {
        return ({
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
            name: {
                type: GraphQLString, resolve(data) {
                    return data.name;
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
            email: {
                type: GraphQLString, resolve(data) {
                    return data.email;
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
            createTime: {
                type: GraphQLString, resolve(data) {
                    return data.createTime;
                }
            },
            state: {
                type: GraphQLInt, resolve(data) {
                    return data.state;
                }
            }
        });
    }
});


const UpdateFrontUser = new GraphQLObjectType({
    name: 'UpdateFrontUser',
    description: "更新前台用户信息",
    fields: () => {
        return ({
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
            name: {
                type: GraphQLString, resolve(data) {
                    return data.name;
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
            email: {
                type: GraphQLString, resolve(data) {
                    return data.email;
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
            createTime: {
                type: GraphQLString, resolve(data) {
                    return data.createTime;
                }
            },
            state: {
                type: GraphQLInt, resolve(data) {
                    return data.state;
                }
            }
        });
    }
});

const QueryAllFrontUser = new GraphQLObjectType({
    name: 'QueryAllFrontUser',
    description: "查询所有用户",
    fields: () => {
        return ({
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
            name: {
                type: GraphQLString, resolve(data) {
                    return data.name;
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
            email: {
                type: GraphQLString, resolve(data) {
                    return data.email;
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
            createTime: {
                type: GraphQLString, resolve(data) {
                    return data.createTime;
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


const DeleteFrontUser = new GraphQLObjectType({
    name: 'DeleteFrontUser',
    description: "删除前台用户",
    fields: () => {
        return ({
            name: {
                type: GraphQLString, resolve(data) {
                    return data.name;
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


const ValidateFrontUser = new GraphQLObjectType({
    name: 'ValidateFrontUser',
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

const SearchFrontUser = new GraphQLObjectType({
    name: 'SearchFrontUser',
    description: "查询符合条件的前台用户",
    fields: () => {
        return ({
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
            name: {
                type: GraphQLString, resolve(data) {
                    return data.name;
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
            email: {
                type: GraphQLString, resolve(data) {
                    return data.email;
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
            createTime: {
                type: GraphQLString, resolve(data) {
                    return data.createTime;
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

const FrontUserTotal = new GraphQLObjectType({
    name: 'FrontUserTotal',
    description: "查询符合条件的前台用户总数",
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
    RegFrontUser, 
    UpdateFrontUser, 
    QueryAllFrontUser, 
    DeleteFrontUser, 
    ValidateFrontUser, 
    SearchFrontUser,
    FrontUserTotal
}