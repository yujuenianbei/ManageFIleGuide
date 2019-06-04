// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
    update:'update user set name=?, age=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryByUsername: 'select * from user where name=? ',
    queryByEmail: 'select * from user where email=? ',
    insertUser:'INSERT INTO user(name, email, phonecode, phone, password, createTime, updateTime) VALUES(?,?,?,?,?,NOW(), NOW())',
    // queryAll: 'select * from user',
    queryAllUser:"SELECT * FROM `user`",
    addUser:'INSERT INTO user( name, sex, intro) VALUES(?,?,?)',
    searchUser:'SELECT * FROM `user` where id= ? ',
    courses:"SELECT * FROM `course`",
    courseById:"SELECT * FROM `course`  where userId= ? limit 10",

    //购物车
    addCart:'INSERT INTO cart(userId, cartId, createTime, updateTime) VALUES(?,?,NOW(), NOW())',
    updateCart:'update cart set productId=?, createTime=NOW(), updateTime=NOW() where userId=?',
    searchCartUser:'SELECT * FROM `cart` where userId= ? AAA.id=BBB.d ',
    // SELECT * from cart,cartItem,user where cart.cartId=cartItem.cartId and user.id=cart.userId

    // 根据用户ID查询用户购物车的内容
    // SELECT cartItem.productId from cart,cartItem,user where cart.cartId=cartItem.cartId and user.id=cart.userId and user.id = ?

    // SELECT id,( SELECT GROUP_CONCAT(c.typeName) FROM `productType` AS c WHERE FIND_IN_SET(c.id,s.type) ) FROM `product` AS s

    // 可以获取购物车内的产品信息
    // SELECT s.productId ,( SELECT GROUP_CONCAT(c.productName) FROM `product` AS c WHERE FIND_IN_SET(c.id,s.productId) ) FROM `cartItem` AS s,cart,user where cart.cartId=s.cartId and user.id=cart.userId and user.id = 1
    
    queryBanner: "SELECT * FROM banner",
    queryBrefIntro: "SELECT * FROM brefIntro",
    queryProductListBanner: "SELECT * FROM productListBanner",
    queryProduct: "SELECT * FROM product where type= ? limit 4",
    // 获取所有产品的类型
    queryProductTypeList: "SELECT id,( SELECT GROUP_CONCAT(c.typeName) FROM `productType` AS c WHERE FIND_IN_SET(c.id,s.type) ) FROM `product` AS s"
};

module.exports = user;