var $sql = require('../../dao/userSqlMapping');
var { searchSql } = require("../../sql/init")
var {
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
const Db = require('../../sql/db');

//定义schema及resolver
const Banners = new GraphQLObjectType({
    name: 'Banners',
    description: "首页banner",
    fields: () => {
        return ({
            // 这种可以
            title: {
                type: GraphQLString, resolve(data) {
                    return data.title;
                }
            },
            img: {
                type: GraphQLString, resolve(data) {
                    return data.img;
                }
            },
            link: {
                type: GraphQLString, resolve(data) {
                    return data.link;
                }
            }
        });
    },
});

const Promiseing = new GraphQLObjectType({
    name: 'Promiseing',
    description: "首页Promiseing",
    fields: () => {
        return ({
            // 这种可以
            title: {
                type: GraphQLString, resolve(data) {
                    return data.title;
                }
            },
            img: {
                type: GraphQLString, resolve(data) {
                    return data.img;
                }
            },
            link: {
                type: GraphQLString, resolve(data) {
                    return data.link;
                }
            }
        });
    },
});

const ProductList = new GraphQLObjectType({
    name: 'ProductList',
    description: "首页ProductListImg",
    fields: () => {
        return ({
            // 这种可以
            id: {
                type: GraphQLID, resolve(data) {
                    return data.id;
                }
            },
            title: {
                type: GraphQLString, resolve(data) {
                    return data.title;
                }
            },
            img: {
                type: GraphQLString, resolve(data) {
                    return data.img;
                }
            },
            link: {
                type: GraphQLString, resolve(data) {
                    return data.link;
                }
            }
        });
    },
});


const ProductListInfoOne = new GraphQLObjectType({
    name: 'ProductInfo',
    description: "ProductInfo",
    fields: () => {
        return ({
            // 这种可以
            id: {
                type: GraphQLInt, resolve(data) {
                    return data.id;
                }
            },
            link: {
                type: GraphQLString, resolve(data) {
                    return data.link;
                }
            },
            img: {
                type: GraphQLString, resolve(data) {
                    return data.img;
                }
            },
            productName: {
                type: GraphQLString, resolve(data) {
                    return data.productName;
                }
            },
            promotionMessage: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessage;
                }
            },
            features: {
                // // 返回数组
                // type: new GraphQLList(GraphQLString), resolve(data) {
                //     return data.features;
                // }
                type: GraphQLString, resolve(data) {
                    return data.features;
                }
            },
            promotionMessageSecond: {
                type: GraphQLString, resolve(data) {
                    return data.promotionMessageSecond;
                }
            },
            usedPrice: {
                type: GraphQLString, resolve(data) {
                    return data.usedPrice;
                }
            },
            nowPrice: {
                type: GraphQLString, resolve(data) {
                    return data.nowPrice;
                }
            }
        });
    },
});



const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    description: "用户信息Input实体",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        sex: { type: GraphQLString },
        intro: { type: GraphQLString },
    }),
});

module.exports = {
    query: {
        banners: {
            type: new GraphQLList(Banners),
            description: '查询首页banner',
            resolve: async function () {
                return await searchSql($sql.queryBanner);
            }
        },
        promiseing: {
            type: new GraphQLList(Promiseing),
            description: '查询首页Promiseing',
            resolve: async function () {
                return await searchSql($sql.queryBrefIntro);
            }
        },
        productList: {
            type: new GraphQLList(ProductList),
            description: '首页产品列表个数',
            resolve: async function (root, args) {
                // console.log(args);
                return await searchSql($sql.queryProductListBanner);
            }
        },
        productListInfoOne: {
            type: new GraphQLList(ProductListInfoOne),
            description: '查询首页ProductInfo',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async function (root, args) {
                // console.log(args);
                return await searchSql($sql.queryProductType, [args.id])
                // if(args.id === 1){
                //     return await searchSql($sql.queryProduct, [args.id])
                // } else if(args.id === 2){
                //     return await searchSql($sql.queryProduct, [args.id])
                // } else if(args.id === 3){
                //     return await searchSql($sql.queryProduct, [args.id])
                // } else if(args.id === 4){
                //     return await searchSql($sql.queryProduct, [args.id])
                // }else if(args.id === 5){
                //     return await searchSql($sql.queryProduct, [args.id])
                // }else if(args.id === 6){
                //     return await searchSql($sql.queryProduct, [args.id])
                // }
                
            }
        }
    },
    mutation: {

    }
};