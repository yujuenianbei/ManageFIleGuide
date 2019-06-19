
// var $sql = require('../../dao/userSqlMapping');
// var { searchSql } = require("../../sql/init")
// var {
//     GraphQLList,
//     GraphQLObjectType,
//     GraphQLSchema,
//     GraphQLString,
//     GraphQLInt,
//     GraphQLFloat,
//     GraphQLEnumType,
//     GraphQLNonNull,
//     GraphQLInterfaceType,
//     GraphQLInputObjectType
// } = require('graphql');
// const Db = require('../../sql/db');

// //定义schema及resolver
// const Unit=new GraphQLEnumType({
//     name:'Unit',
//     description:"单位",
//     values: {
//         MM: {value: 'MM'},
//         cm: {value: 'cm'},
//         mm: {value: 'mm'},
//     }
// });

// const User=new GraphQLObjectType({
//     name:'User',
//     description:"用户信息实体",
//     fields: () => {
//         return ({
//             id: {type: new GraphQLNonNull(GraphQLInt)},
//             name: {type: new GraphQLNonNull(GraphQLString)},
//             sex: {type: new GraphQLNonNull(GraphQLString)},
//             intro: {type: new GraphQLNonNull(GraphQLString)},
//             stature: {
//                 type: GraphQLFloat,
//                 args: {
//                     unit: {type: Unit}
//                 },
//                 resolve: function (user, {unit}) {
//                     if (unit == 'MM') {
//                         return user.stature/100;
//                     } if (unit == 'cm') {
//                         return user.stature;
//                     }else if (unit == 'mm') {
//                         return user.stature*10;
//                     }
//                 }
//             },
//         });
//     },
// });
// const  UserInput=new GraphQLInputObjectType({
//     name:'UserInput',
//     description:"用户信息Input实体",
//     fields:()=>({
//         name:{type:new GraphQLNonNull(GraphQLString)},
//         sex:{type:new GraphQLNonNull(GraphQLString)},
//         intro:{type:new GraphQLNonNull(GraphQLString)},
//         stature:{type:Unit},
//     }),
// });

// module.exports = {
//     query:{
//         user:{
//             type:User,
//             description:'根据id查询单个用户',
//             args: {
//                 id: {type: new GraphQLNonNull(GraphQLInt)}
//             },
//             resolve(root, args){
//                 return Db.models.user.findAll({where: args});
//             }
//             // resolve:async function (source,{id}) {
//             //     console.log(await searchSql($sql.queryById,[id]))
//             //     return (await searchSql($sql.queryById,[id]));
//             // }
//         },
//         users:{
//             type:new GraphQLList(User),
//             description:'查询全部用户列表',
//             resolve:async function () {
//                 return await searchSql($sql.queryAll);
//             }
//         }
//     },
//     mutation:{
//         addUser:{
//             type:User,
//             description:'添加用户',
//             args: {
//                 id:{type: GraphQLInt},
//                 name:{type: new GraphQLNonNull(GraphQLString)},
//                 sex:{type: new GraphQLNonNull(GraphQLString)},
//                 intro:{type: new GraphQLNonNull(GraphQLString)},
//             },
//             resolve:async function (source,{id,name,sex,intro}) {
//                 var user={
//                     name:name,
//                     sex:sex,
//                     intro:intro
//                 };
//                 // return await searchSql( $sql.addUser,[user.name,user.sex,user.intro]);
//                 return Db.models.user.findAll({where: args});
//             }
//         },
//         addUserByInput:{
//             type:User,
//             description:'通过Input添加用户',
//             args: {
//                 userInfo:{type: UserInput},
//             },
//             resolve:async function (source,{userInfo}) {
//                 return await searchSql( $sql.addUser,[userInfo.name,userInfo.sex,userInfo.intro]);
//             }
//         }
//     }
// };



var $sql = require('../../dao/userSqlMapping');
var { searchSql } = require("../../sql/init")
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
const Db = require('../../sql/db');

//定义schema及resolver
const Unit = new GraphQLEnumType({
    name: 'Unit',
    description: "单位",
    values: {
        MM: { value: 'MM' },
        cm: { value: 'cm' },
        mm: { value: 'mm' },
    }
});

const User = new GraphQLObjectType({
    name: 'User',
    description: "用户信息实体",
    fields: () => {
        return ({
            // 这种可以
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
            sex: {
                type: GraphQLString, resolve(data) {
                    return data.sex;
                }
            },
            intro: {
                type: GraphQLString, resolve(data) {
                    return data.intro;
                }
            },

            // // 这种也可以
            // id: {type: new GraphQLNonNull(GraphQLInt)},
            // name: {type: new GraphQLNonNull(GraphQLString)},
            // sex: {type: new GraphQLNonNull(GraphQLString)},
            // intro: {type: new GraphQLNonNull(GraphQLString)},

            // 表里面没加这个字段
            // stature: {
            //     type: GraphQLFloat,
            //     args: {
            //         unit: {type: Unit}
            //     },
            //     resolve: function (user, {unit}) {
            //         if (unit == 'MM') {
            //             return user.stature/100;
            //         } if (unit == 'cm') {
            //             return user.stature;
            //         }else if (unit == 'mm') {
            //             return user.stature*10;
            //         }
            //     }
            // },
        });
    },
});

const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    description: "用户信息Input实体",
    fields: () => ({
        id: {type: GraphQLInt},
        name: { type: GraphQLString },
        sex: { type: GraphQLString },
        intro: { type: GraphQLString },
        // stature:{type:Unit},
    }),
});

module.exports = {
    query: {
        // 查
        user: {
            // 主要是这个　要不然出不来数据
            type: new GraphQLList(User),
            description: '根据id查询单个用户',
            args: {
                id: { type: GraphQLInt }
            },

            // 使用sequelize的方法进行查询
            // resolve(root, args){
            //     return Db.models.searchUser.findAll({where: args});
            // }

            // 用sql查询
            resolve: async function (source, { id }) {
                console.log(await searchSql($sql.queryById, [id]))
                return (await searchSql($sql.queryById, [id]));
            }
        },
        users: {
            type: new GraphQLList(User),
            description: '查询全部用户列表',
            resolve: async function () {
                return await searchSql($sql.queryAll);
            }
        }

    },
    mutation: {
        // 增　返回新增的内容
        addUser: {
            type: new GraphQLList(User),
            description: '添加用户',
            args: {
                id: { type: GraphQLInt },
                name: { type: GraphQLString },
                sex: { type: GraphQLString },
                intro: { type: GraphQLString },
            },
            resolve: async function(root, args) {
                return await Db.models.addUser.create({
                    name: args.name,
                    sex: args.sex,
                    intro: args.intro,
                }).then((result)=>{
                    console.log(searchSql($sql.queryById, [result.id]))
                    return searchSql($sql.queryById, [result.id])
                });
            }
        },
        // 改 返回改过之后的内容
        addUserByInput: {
            type: new GraphQLList(User),
            description: '修改用户信息',
            args: {
                id: { type: GraphQLInt },
                name: { type: GraphQLString },
                sex: { type: GraphQLString },
                intro: { type: GraphQLString },
            },
            resolve: async function(root, args) {
                console.log(args.id,args.name,args.sex,args.intro)
                return await Db.models.searchUser.update({
                    name: args.name,
                    sex: args.sex,
                    intro: args.intro,
                },{
                    where:{
                        id: args.id,
                    }
                }).then(() => {
                    return searchSql($sql.queryById, [args.id])
                })
            }
        },
        updateUser: {
            type: new GraphQLList(User),
            description: '修改用户信息',
            args: {
                id: { type: GraphQLInt },
                name: { type: GraphQLString },
                sex: { type: GraphQLString },
                intro: { type: GraphQLString },
            },
            resolve: async function(root, args) {
                console.log(args.id,args.name,args.sex,args.intro)
                return await Db.models.searchUser.update({
                    name: args.name,
                    sex: args.sex,
                    intro: args.intro,
                },{
                    where:{
                        id: args.id,
                    }
                }).then(() => {
                    return searchSql($sql.queryById, [args.id])
                  })
            }
        },
        // 删
        deleteUser:{
            type: new GraphQLList(User),
            description: '修改用户信息',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async function(root, args) {
                return await Db.models.searchUser.destroy({
                    where: {
                      id: args.id,
                    },
                  }).then(async() => {
                    console.log(await searchSql($sql.queryById, [args.id]))
                    return await searchSql($sql.queryById, [args.id])
                  })
            }
        }
    }
};