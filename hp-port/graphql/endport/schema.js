var {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql');


// 前台
const account = require('./account');
// 后台



const Query=new GraphQLObjectType({
    name:'UserQuery',
    description:'用户信息查询',
    fields:()=>(Object.assign({},
        account.query,
    )),
});
const Mutation=new GraphQLObjectType({
    name:'UserMutation',
    description:'用户信息维护',
    fields:()=>(Object.assign({},
        account.mutation,
    )),
});
const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = schema;