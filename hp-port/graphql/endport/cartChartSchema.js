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

const QueryAllCart = new GraphQLObjectType({
    name: 'QueryAllCart',
    description: "查询所有用户的购物车",
    fields: () => {
        return ({
            id: {
                type: GraphQLInt, resolve(data) {
                    return data.id;
                }
            },
            cartId: {
                type: GraphQLInt, resolve(data) {
                    return data.cartId;
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
            phone: {
                type: GraphQLString, resolve(data) {
                    return data.phone;
                }
            },
            phoneCode: {
                type: GraphQLInt, resolve(data) {
                    return data.phoneCode;
                }
            },
            productName: {
                type: GraphQLString, resolve(data) {
                    return data.productName;
                }
            },
            typeName: {
                type: GraphQLString, resolve(data) {
                    return data.typeName;
                }
            },
            img: {
                type: GraphQLString, resolve(data) {
                    return data.img;
                }
            },
            promotionMessage: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessage;
                }
            },
            featrues: {
                type: GraphQLString, resolve(data) {
                    return data.featrues;
                }
            },
            promotionMessageSecond: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessageSecond;
                }
            },
            featrues: {
                type: GraphQLString, resolve(data) {
                    return data.featrues;
                }
            },
            usedPrice: {
                type: GraphQLInt, resolve(data) {
                    return data.usedPrice;
                }
            },
            nowPrice: {
                type: GraphQLInt, resolve(data) {
                    return data.nowPrice;
                }
            },
            productNum: {
                type: GraphQLInt, resolve(data) {
                    return data.productNum;
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
const QueryProductNumberOfType = new GraphQLObjectType({
    name: 'QueryProductNumberOfType',
    description: "查询符合条件的购物车总数",
    fields: () => {
        return ({
            id: {
                type: GraphQLInt, resolve(data) {
                    return data.id;
                }
            },
            count: {
                type: GraphQLInt, resolve(data) {
                    return data.count;
                }
            },
            item: {
                type: GraphQLString, resolve(data) {
                    return data.item;
                }
            }
        });
    },
});



module.exports = { 
    QueryProductNumberOfType
}