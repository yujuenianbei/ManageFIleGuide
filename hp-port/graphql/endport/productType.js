const jwt = require('jsonwebtoken')
const $sql = require('../../dao/endPortSqlMapping');
const { searchSql } = require("../../sql/init")
const {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLScalarType,
    GraphQLEnumValue,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql');
const Db = require('../../sql/db');
const { queryAllProductType } = require('./productTypeSchema');

module.exports = {
    query: {
         // 获取产品分类
         AllProductType: {
            type: new GraphQLList(queryAllProductType),
            description: '获取所有产品分类',
            resolve: async function () {
                return await searchSql($sql.queryAllEndProductType)
                .then(async (reslut) => {
                    console.log(reslut)
                    return await reslut;
                })
            }
        }
    },
    mutation: {

    }
};