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

const queryAllProductType = new GraphQLObjectType({
    name: 'queryAllProductType',
    description: "查询符合条件的产品",
    fields: () => {
        return ({
            id: {
                type: GraphQLInt, resolve(data) {
                    return data.id;
                }
            },
            typeName: {
                type: GraphQLString, resolve(data) {
                    return data.typeName;
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
            state: {
                type: GraphQLInt, resolve(data) {
                    return data.state;
                }
            }
        });
    },
});

module.exports = { 
    queryAllProductType
}