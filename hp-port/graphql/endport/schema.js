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


const account = require('./account');
const frontUser = require('./frontUser');
const product = require('./product');
const productType = require('./productType');
const cart = require('./cart');
const order = require('./order');
const goodsResInfo = require('./goodsResInfo');
const cartChart = require('./cartChart');

const Query=new GraphQLObjectType({
    name:'EndQuery',
    description:'用户信息查询',
    fields:()=>(Object.assign({},
        account.query,
        frontUser.query,
        product.query,
        productType.query,
        cart.query,
        order.query,
        goodsResInfo.query,
        cartChart.query
    )),
});
const Mutation=new GraphQLObjectType({
    name:'EndMutation',
    description:'用户信息维护',
    fields:()=>(Object.assign({},
        account.mutation,
        frontUser.mutation,
        product.mutation,
        productType.mutation,
        cart.mutation,
        order.mutation,
        goodsResInfo.mutation,
        cartChart.mutation
    )),
});
const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = schema;