// dao/userSqlMapping.js
// CRUD SQL语句
var endPort = {

    // account
    insertEndUser: 'INSERT INTO account(uuid, uid, userName, sex, email, firstName, lastName, phoneCode, phone, password, company, createTime, updateTime) VALUES(REPLACE(UUID(),"-",""),REPLACE(UUID(),"-",""),?,?,?,?,?,?,?,?,?,NOW(), NOW())',
    updateEndUser: 'UPDATE account set userName=?, sex=?, email=?, firstName=?, lastName=?, phoneCode=?, phone=?, password=?, company=?, updateTime=NOW() where id=?',
    queryAllEndUser: "SELECT * FROM `account`",
    queryEndUserById: 'SELECT * FROM `account` WHERE id=?',
    deleteEndUserById: 'DELETE FROM `account` WHERE id=?',
    queryEndUserByUserName: 'SELECT * FROM `account` WHERE userName=?',
    updateEndUserLoginTime: "update `account` set updateTime=? where id=?",
    searchAllAccount: 'SELECT count(*) as total FROM account',
    searchTotal: 'SELECT FOUND_ROWS() as total',

    // frontUser
    insertFrontUser: 'INSERT INTO user(uuid, name, sex, email, phoneCode, phone, password, company, createTime, updateTime) VALUES(REPLACE(UUID(),"-",""),?,?,?,?,?,?,?,NOW(), NOW())',
    updateFrontUser: 'UPDATE user SET name=?, sex=?, email=?, phoneCode=?, phone=?, password=?, company=?, updateTime=NOW() WHERE id=?',
    queryFrontUserByUserName: 'SELECT * FROM `user` WHERE name=?',
    queryAllFrontUser: "SELECT * FROM `user`",
    deleteFrontUserById: 'DELETE FROM `user` WHERE id=?',
    queryFrontUserById: 'SELECT * FROM `user` WHERE id=?',
    searchAllFrontUser: 'SELECT count(*) as total FROM user',

    // product
    queryEndProductByName: 'SELECT * FROM `product` WHERE productName=?',
    queryEndProductById: 'SELECT * FROM `product` WHERE id=?',
    updateEndProduct: 'UPDATE product set productName=?, type=?, img=?, promotionMessage=?, features=?, promotionMessageSecond=?, usedPrice=?, nowPrice=?, updateTime=NOW() where id=?',
    insertEndProduct: 'INSERT INTO product(productName, type, img, promotionMessage, features, promotionMessageSecond, usedPrice, nowPrice, createTime, updateTime) VALUES(?,?,?,?,?,?,?,?,NOW(), NOW())',
    searchAllProduct: 'SELECT count(*) as total FROM product',
    searchTotalProduct: 'SELECT FOUND_ROWS() as total',
    deleteEndProduct: 'DELETE FROM `product` WHERE id=?',

    // productType
    queryAllEndProductType: 'SELECT * FROM `productType`',
    queryEndProductTypeByName: 'SELECT * FROM productType WHERE typeName=?',
    queryEndProductTypeById: 'SELECT * FROM `productType` WHERE id=?',
    updateEndProductTypeById: 'UPDATE productType SET typeName=?, updateTime=NOW() WHERE id=?',
    insertEndProductType: 'INSERT INTO productType(typeName, createTime, updateTime) VALUES(?,NOW(), NOW())',
    deleteEndProductType: 'DELETE FROM `productType` WHERE id=?',
    countAllProductType: 'SELECT count(*) as total FROM productType',


    // cart
    queryCart: 'SELECT * FROM `cart`',
    queryUser: 'SELECT * FROM `user` WHERE id in(SELECT userId FROM `cart`)',
    // 返回所有用户的购物车的产品
    queryCartItem: 'SELECT * FROM `cartItem` WHERE cartId in(SELECT cartId FROM `cart`)',
    // 返回所有用户的购物车的产品信息
    queryAllProductInCart: 'SELECT USER.id,USER.name,USER.email,USER.phoneCode,USER.phone,PTYPE.typeName,PRO.productName,PRO.img,PRO.promotionMessage,PRO.features,PRO.promotionMessageSecond, PRO.usedPrice,PRO.nowPrice,ITEM.cartId,ITEM.createTime,ITEM.updateTime,ITEM.productNum FROM (SELECT id,name,email,phoneCode,phone FROM `user` WHERE id in(SELECT userId FROM `cart`)) AS USER, product AS PRO,cartItem AS ITEM,cart AS CART,productType AS PTYPE WHERE PRO.id = ITEM.productId AND USER.id =CART.userId and ITEM.cartId = CART.cartId and PTYPE.id = PRO.type ',
    searchAllCart: 'SELECT count(*) as total FROM cartItem',
    serachTypeCart: 'SELECT count(*) as total FROM (SELECT id,name,email,phoneCode,phone FROM `user` WHERE id in(SELECT userId FROM `cart`)) AS USER, product AS PRO,cartItem AS ITEM,cart AS CART,productType AS PTYPE WHERE PRO.id = ITEM.productId AND USER.id =CART.userId and ITEM.cartId = CART.cartId and PTYPE.id = PRO.type and ',
    // 获取所有购物车中每个产品分类中的产品数量
    queryAllProductNumberOfType: 'SELECT PTYPE.typeName as item, sum(ITEM.productNum) as count FROM (SELECT id,name,email,phoneCode,phone FROM `user` WHERE id in(SELECT userId FROM `cart`)) AS USER, product AS PRO,cartItem AS ITEM,cart AS CART,productType AS PTYPE WHERE PRO.id = ITEM.productId AND USER.id =CART.userId and ITEM.cartId = CART.cartId and PTYPE.id = PRO.type GROUP BY PTYPE.typeName',
    // 获取用户购物车中保存最多的前十个产品
    queryTopTenProductInCart: 'SELECT PRO.productName,PRO.img,PRO.usedPrice,PRO.nowPrice,ITEM.cartId,ITEM.createTime,ITEM.updateTime,ITEM.productNum FROM (SELECT id,name,email,phoneCode,phone FROM `user` WHERE id in(SELECT userId FROM `cart`)) AS USER, product AS PRO,cartItem AS ITEM,cart AS CART WHERE PRO.id = ITEM.productId AND USER.id =CART.userId and ITEM.cartId = CART.cartId ORDER BY productNum DESC limit 0,10',

    // order
    queryAllOrderInOrders: 'SELECT USER.id, USER.name, USER.phoneCode, USER.phone,USER.email,PRO.id AS productId, PRO.productName, PROT.typeName AS productType, PRO.img AS productImg, PRO.promotionMessage, PRO.promotionMessageSecond, PRO.features, PRO.usedPrice, PRO.nowPrice, ORDERS.orderOdd, PAYM.name AS payMethod, ORDERS.id AS orderId,ORDERS.payTime, ORDERS.payState, DELVM.name AS deliveryMethod, ORDERS.deliveryHopeTime, ORDERS.expressOdd, ORDERS.goodsResAddress, ORDERS.fullPrice, ORS.name AS orderState, ORDERS.orderState AS orderStateNum, ORPRO.productNum, ORDERS.createTime, ORDERS.updateTime FROM user AS USER, product AS PRO, goodsResInfo AS GRF, orders AS ORDERS, orderProducts AS ORPRO, productType AS PROT, orderState AS ORS, payMethod AS PAYM, deliveryMethod AS DELVM WHERE USER.name=GRF.userName AND GRF.id=ORDERS.goodsResAddress AND ORDERS.orderOdd=ORPRO.orderOdd and ORPRO.productId=PRO.id AND PROT.id=PRO.type AND PAYM.ID=ORDERS.payMethod AND ORDERS.deliveryMethod=DELVM.id AND ORDERS.orderState=ORS.id ',
    searchAllOrders: 'SELECT count(*) as total FROM orderProducts',
    serachTypeOrders: 'SELECT count(*) as total FROM user AS USER, product AS PRO, goodsResInfo AS GRF, orders AS ORDERS, orderProducts AS ORPRO, productType AS PROT, orderState AS ORS, payMethod AS PAYM, deliveryMethod AS DELVM WHERE  USER.name=GRF.userName AND GRF.id=ORDERS.goodsResAddress AND ORDERS.orderOdd=ORPRO.orderOdd and ORPRO.productId=PRO.id AND PROT.id=PRO.type AND PAYM.ID=ORDERS.payMethod AND ORDERS.deliveryMethod=DELVM.id AND ORDERS.orderState=ORS.id ',
    searchTotalOrders: 'SELECT FOUND_ROWS() as total',
    updateOrderGoodsResInfo: 'UPDATE orders SET goodsResAddress=? WHERE id=?',

    // goodsResInfo
    queryGoodsResInfo: "SELECT * FROM goodsResInfo where id= ?",
    insertGoodsResInfo: "INSERT INTO goodsResInfo(email, userName, firstName, lastName, phoneCode, phone, province, address, postCode, addressState, createTime, updateTime) VALUES(?,?,?,?,?,?,?,?,?,1,NOW(), NOW())",
    updateGoodsResInfo: "UPDATE goodsResInfo SET email=?, firstName=?, lastName=?, phoneCode=?, phone=?, province=?, address=?, postCode=?, updateTime=NOW()",
    deleteGoodsResInfo: "UPDATE goodsResInfo SET addressState=0 WHERE id=?",
    serachOrderAddress: 'SELECT * from goodsResInfo, orders WHERE goodsResInfo.id=? AND orders.goodsResAddress=goodsResInfo.id AND orders.id = ?',
    searchUserAllAddress: 'SELECT * from goodsResInfo WHERE userName=?',




    // 获取所有购物车里面的产品信息
    // 'SELECT * FROM  product,cartItem WHERE product.id = cartItem.productId'

    
    
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
    // queryUserCartProductInfo: "SELECT c.id, c.productName, c.type, c.img, c.promotionMessage, c.features, c.promotionMessageSecond, c.usedPrice, c.nowPrice,i.productNum FROM product AS c,cartItem AS i WHERE (SELECT i.productId FROM cart,user WHERE cart.cartId=i.cartId and user.id=cart.userId and i.productId=c.id and user.id = ? )",
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