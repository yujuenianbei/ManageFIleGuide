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
const cart = require('./cart');
const homeSchema = require('./home');
const product = require('./product');

const Query=new GraphQLObjectType({
    name:'UserQuery',
    description:'用户信息查询',
    fields:()=>(Object.assign({},
        account.query,
        cart.query,
        userSchema.query,
        courseSchema.query,
        homeSchema.query,
        product.query
    )),
});
const Mutation=new GraphQLObjectType({
    name:'UserMutation',
    description:'用户信息维护',
    fields:()=>(Object.assign({},
        userSchema.mutation,
        account.mutation,
        cart.mutation,
        product.mutation
    )),
});
const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = schema;