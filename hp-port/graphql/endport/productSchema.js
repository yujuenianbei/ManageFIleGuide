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

const SearchProduct = new GraphQLObjectType({
    name: 'SearchProduct',
    description: "查询符合条件的产品",
    fields: () => {
        return ({
            id: {
                type: GraphQLInt, resolve(data) {
                    return data.id;
                }
            },
            productName: {
                type: GraphQLString, resolve(data) {
                    return data.productName;
                }
            },
            type: {
                type: GraphQLInt, resolve(data) {
                    return data.type;
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

const AddProduct = new GraphQLObjectType({
    name: 'AddProduct',
    description: "添加产品",
    fields: () => {
        return ({
            id: {
                type: GraphQLInt, resolve(data) {
                    return data.id;
                }
            },
            productName: {
                type: GraphQLString, resolve(data) {
                    return data.productName;
                }
            },
            type: {
                type: GraphQLInt, resolve(data) {
                    return data.type;
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


const UpdateProduct = new GraphQLObjectType({
    name: 'UpdateProduct',
    description: "更新产品信息",
    fields: () => {
        return ({
            id: {
                type: GraphQLInt, resolve(data) {
                    return data.id;
                }
            },
            productName: {
                type: GraphQLString, resolve(data) {
                    return data.productName;
                }
            },
            type: {
                type: GraphQLInt, resolve(data) {
                    return data.type;
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

const DeleteProduct = new GraphQLObjectType({
    name: 'DeleteProduct',
    description: "删除用户",
    fields: () => {
        return ({
            productName: {
                type: GraphQLString, resolve(data) {
                    return data.productName;
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



const PorductTotal = new GraphQLObjectType({
    name: 'PorductTotal',
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
    SearchProduct,
    AddProduct,
    UpdateProduct,
    DeleteProduct,
    PorductTotal
}