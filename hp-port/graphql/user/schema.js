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

const userSchema = require('./user');
const courseSchema = require('./course');

const account = require('./account');
const homeSchema = require('./home');

const Query=new GraphQLObjectType({
    name:'UserQuery',
    description:'用户信息查询',
    fields:()=>(Object.assign({},
        account.query,
        userSchema.query,
        courseSchema.query,
        homeSchema.query
    )),
});
const Mutation=new GraphQLObjectType({
    name:'UserMutation',
    description:'用户信息维护',
    fields:()=>(Object.assign({},
        userSchema.mutation
    )),
});
const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = schema;