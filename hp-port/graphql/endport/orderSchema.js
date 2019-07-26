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

const QueryAllOrder = new GraphQLObjectType({
    name: 'QueryAllOrder',
    description: "查询所有用户的订单",
    fields: () => {
        return ({
            id: {
                type: GraphQLInt, resolve(data) {
                    return data.id;
                }
            },
            name: {
                type: GraphQLString, resolve(data) {
                    return data.name;
                }
            },
            email: {
                type: GraphQLString, resolve(data) {
                    return data.email;
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
            productId: {
                type: GraphQLInt, resolve(data) {
                    return data.productId;
                }
            },
            productName: {
                type: GraphQLString, resolve(data) {
                    return data.productName;
                }
            },
            productType: {
                type: GraphQLString, resolve(data) {
                    return data.productType;
                }
            },
            productImg: {
                type: GraphQLString, resolve(data) {
                    return data.productImg;
                }
            },
            promotionMessage: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessage;
                }
            },
            promotionMessageSecond: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessageSecond;
                }
            },
            features: {
                type: GraphQLString, resolve(data) {
                    return data.features;
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
            orderOdd: {
                type: GraphQLString, resolve(data) {
                    return data.orderOdd;
                }
            },
            payMethod: {
                type: GraphQLString, resolve(data) {
                    return data.payMethod;
                }
            },
            payTime: {
                type: GraphQLString, resolve(data) {
                    return data.payTime;
                }
            },
            payState: {
                type: GraphQLInt, resolve(data) {
                    return data.payState;
                }
            },
            deliveryMethod: {
                type: GraphQLString, resolve(data) {
                    return data.deliveryMethod;
                }
            },
            deliveryHopeTime: {
                type: GraphQLString, resolve(data) {
                    return data.deliveryHopeTime;
                }
            },
            expressOdd: {
                type: GraphQLString, resolve(data) {
                    return data.expressOdd;
                }
            },
            goodsResAddress: {
                type: GraphQLInt, resolve(data) {
                    return data.goodsResAddress;
                }
            },
            fullPrice: {
                type: GraphQLInt, resolve(data) {
                    return data.fullPrice;
                }
            },
            orderState: {
                type: GraphQLString, resolve(data) {
                    return data.orderState;
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
            },
        });
    },
});
const OrderItemTotal = new GraphQLObjectType({
    name: 'OrderItemTotal',
    description: "查询符合条件的购物车总数",
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
    QueryAllOrder,
    OrderItemTotal
}