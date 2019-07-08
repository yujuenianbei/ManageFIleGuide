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
const product = require('./product');
const productType = require('./productType');



const Query=new GraphQLObjectType({
    name:'EndQuery',
    description:'用户信息查询',
    fields:()=>(Object.assign({},
        account.query,
        product.query,
        productType.query
    )),
});
const Mutation=new GraphQLObjectType({
    name:'EndMutation',
    description:'用户信息维护',
    fields:()=>(Object.assign({},
        account.mutation,
        product.mutation,
        productType.mutation
    )),
});
const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = schema;