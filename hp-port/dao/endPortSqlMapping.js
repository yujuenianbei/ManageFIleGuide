// dao/userSqlMapping.js
// CRUD SQL语句
var endPort = {


    insertEndUser:'INSERT INTO account(uuid, uid, userName, sex, email, firstName, lastName, phoneCode, phone, password, company, createTime, updateTime) VALUES(REPLACE(UUID(),"-",""),REPLACE(UUID(),"-",""),?,?,?,?,?,?,?,?,?,NOW(), NOW())',
    updateEndUser: 'UPDATE account set userName=?, sex=?, email=?, firstName=?, lastName=?, phoneCode=?, phone=?, password=?, company=?, updateTime=NOW() where id=?',
    queryAllEndUser:"SELECT * FROM `account`",
    queryEndUserById: 'SELECT * FROM `account` WHERE id=?',
    deleteEndUserById: 'DELETE FROM `account` WHERE id=?',
    queryEndUserByUserName: 'SELECT * FROM `account` WHERE userName=?',
    searchTotal: 'SELECT FOUND_ROWS() as total'



    // insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
    // update:'update user set name=?, age=? where id=?',
    // delete: 'delete from user where id=?',
    // queryById: 'select * from user where id=?',
    // queryByUsername: 'select * from user where name=? ',
    // queryByEmail: 'select * from user where email=? ',

    
    // // queryAll: 'select * from user',
    
    // addUser:'INSERT INTO user( name, sex, intro) VALUES(?,?,?)',
    // searchUser:'SELECT * FROM `user` where id= ? ',
    // courses:"SELECT * FROM `course`",
    // courseById:"SELECT * FROM `course`  where userId= ? limit 10",

    // // 用户
    // updateUserLoginTime: "update user set updateTime=? where id=?",

    // // 用户扫描的状态
    // queryUserUid: "select * from user where uuid=?",
    // inserUidQr: "INSERT IGNORE INTO qrcode(uid, uuid, state, createTime, updateTime) VALUES(?,?,?,NOW(),NOW())",
    // searchUidState: "SELECT * FROM `qrcode` where uid= ? ",
    // updateUidState: "UPDATE qrcode set uuid=?, state=? where uid=?",
    // deleteUidState: "DELETE FROM `qrcode` where uid= ? ",
    // //购物车

    // // 获取指定用户的购物车产品信息
    // queryUserCartProductInfo: "SELECT c.id, c.productName, c.type, c.img, c.promotionMessage, c.featrues, c.promotionMessageSecond, c.usedPrice, c.nowPrice,i.productNum FROM product AS c,cartItem AS i WHERE (SELECT i.productId FROM cart,user WHERE cart.cartId=i.cartId and user.id=cart.userId and i.productId=c.id and user.id = ? )",
    // // 查询用户在购物车内有没有购物车内容
    // queryCartUser:'SELECT * FROM `cart` where userId= ?',
    // // 查询购物车中某个产品个数
    // queryCartProductNum:'SELECT * FROM `cartItem` where productId= ? and cartId=?',
    // // 创建购物车
    // // 创建用户和购物车对应关系
    // createCart:'INSERT INTO cart(userId, cartId, createTime, updateTime) VALUES(?,?,NOW(), NOW())',
    // // 创建购物车和产品对应关系
    // createCartItem:'INSERT INTO cartItem(cartId, productId, productNum, createTime, updateTime) VALUES(?,?,?,NOW(), NOW())',
    // // 查询购物车内是否有这个产品
    // queryProductInCartItem: "SELECT * FROM `cartItem` WHERE cartId=? AND productId=?",
    // // 更新购物车内某个产品的数量
    // updateProductInCartItem:'UPDATE cartItem SET productNum=?, createTime=NOW(), updateTime=NOW() where cartId=? and productId=?',
    // // 删除购物车中某个产品
    // deleteProductInCartItem: 'DELETE FROM cartItem WHERE productId=? and cartId=?',
    // // 删除购物车中某个购物车的内容
    // deleteCartIdCartItem: 'DELETE FROM cartItem WHERE cartId=?',
    // // 删除购物车和用户的对应关系
    // deleteUserIdCart: 'DELETE FROM cart WHERE cartId=?',


    // // SELECT * from cart,cartItem,user where cart.cartId=cartItem.cartId and user.id=cart.userId
    // // 根据用户ID查询用户购物车的内容
    // // SELECT cartItem.productId from cart,cartItem,user where cart.cartId=cartItem.cartId and user.id=cart.userId and user.id = ?
    // // SELECT id,( SELECT GROUP_CONCAT(c.typeName) FROM `productType` AS c WHERE FIND_IN_SET(c.id,s.type) ) FROM `product` AS s
    // // 可以获取购物车内的产品信息
    // // SELECT s.productId ,( SELECT GROUP_CONCAT(c.productName) FROM `product` AS c WHERE FIND_IN_SET(c.id,s.productId) ) FROM `cartItem` AS s,cart,user where cart.cartId=s.cartId and user.id=cart.userId and user.id = 1
    // // SELECT cartItem.productId ,( SELECT product.productName FROM product WHERE product.id=cartItem.productId ) FROM cartItem,cart,user where cart.cartId=cartItem.cartId and user.id=cart.userId and user.id = 5
    // // SELECT * FROM product AS c WHERE (SELECT i.productId FROM cartItem AS i,cart,user WHERE cart.cartId=i.cartId and user.id=cart.userId and i.productId=c.id and user.id = 5 )
    
    // queryBanner: "SELECT * FROM banner",
    // queryBrefIntro: "SELECT * FROM brefIntro",
    // queryProductListBanner: "SELECT * FROM productListBanner",
    // queryProductType: "SELECT * FROM product where type= ? limit 4",

    // // 查询产品详情
    // queryProductInfo: "SELECT * FROM product where id= ?",
    // // 获取所有产品的类型
    // queryProductTypeList: "SELECT id,( SELECT GROUP_CONCAT(c.typeName) FROM `productType` AS c WHERE FIND_IN_SET(c.id,s.type) ) FROM `product` AS s",
    

    // // 产品
    // // 分页
    // queryProductByPage: "SELECT * FROM product ORDER BY id ASC limit ?,?",
    // // 获取产品数量
    // queryProductNum: "SELECT count(id) count FROM product ORDER BY id ASC"
};

module.exports = endPort;