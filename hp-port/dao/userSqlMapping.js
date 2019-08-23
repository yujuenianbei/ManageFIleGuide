// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert: 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
    update: 'update user set name=?, age=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryByUsername: 'select * from user where name=? ',
    queryByEmail: 'select * from user where email=? ',

    insertUser: 'INSERT INTO user(uuid, name, email, phoneCode, phone, password, createTime, updateTime) VALUES(REPLACE(UUID(),"-",""),?,?,?,?,?,NOW(), NOW())',
    // queryAll: 'select * from user',
    queryAllUser: "SELECT * FROM `user`",
    addUser: 'INSERT INTO user( name, sex, intro) VALUES(?,?,?)',
    searchUser: 'SELECT * FROM `user` where id= ? ',
    courses: "SELECT * FROM `course`",
    courseById: "SELECT * FROM `course`  where userId= ? limit 10",

    // 用户
    updateUserLoginTime: "update user set updateTime=? where id=?",

    // 用户扫描的状态
    queryUserUid: "select * from user where uuid=?",
    inserUidQr: "INSERT IGNORE INTO qrcode(uid, uuid, state, createTime, updateTime) VALUES(?,?,?,NOW(),NOW())",
    searchUidState: "SELECT * FROM `qrcode` where uid= ? ",
    updateUidState: "UPDATE qrcode set uuid=?, state=? where uid=?",
    deleteUidState: "DELETE FROM `qrcode` where uid= ? ",
    //购物车

    // 获取指定用户的购物车产品信息
    queryUserCartProductInfo: "SELECT c.id, c.productName, c.type, c.img, c.promotionMessage, c.features, c.promotionMessageSecond, c.usedPrice, c.nowPrice,i.productNum FROM product AS c,cartItem AS i WHERE (SELECT i.productId FROM cart,user WHERE cart.cartId=i.cartId and user.id=cart.userId and i.productId=c.id and user.id = ? )",
    // 查询用户在购物车内有没有购物车内容
    queryCartUser: 'SELECT * FROM `cart` where userId= ?',
    // 查询购物车中某个产品个数
    queryCartProductNum: 'SELECT * FROM `cartItem` where productId= ? and cartId=?',
    // 创建购物车
    // 创建用户和购物车对应关系
    createCart: 'INSERT INTO cart(userId, cartId, createTime, updateTime) VALUES(?,?,NOW(), NOW())',
    // 创建购物车和产品对应关系
    createCartItem: 'INSERT INTO cartItem(cartId, productId, productNum, createTime, updateTime) VALUES(?,?,?,NOW(), NOW())',
    // 查询购物车内是否有这个产品
    queryProductInCartItem: "SELECT * FROM `cartItem` WHERE cartId=? AND productId=?",
    // 
    queryProductInCartItems: "SELECT * FROM `cartItem` WHERE cartId=? AND productId in (?)",
    // 更新购物车内某个产品的数量
    updateProductInCartItem: 'UPDATE cartItem SET productNum=?, createTime=NOW(), updateTime=NOW() where cartId=? and productId=?',
    // 删除购物车中某个产品
    deleteProductInCartItem: 'DELETE FROM cartItem WHERE productId=? and cartId=?',
    // 删除购物车中某个购物车的内容
    deleteCartIdCartItem: 'DELETE FROM cartItem WHERE cartId=?',
    // 删除购物车和用户的对应关系
    deleteUserIdCart: 'DELETE FROM cart WHERE cartId=?',
    // 批量删除购物车中某个产品
    deleteProductInCartItems: 'DELETE FROM cartItem WHERE productId in ? and cartId=?',
    // 根据用户Email查找对应的cartId 
    queryUserCartIdByEmail: 'select cart.cartId from (select id, name from user where email=?) as User, cart where User.id=cart.userId',


    // 根据email查找到对应的产品id
    // "select cartItem.id, cartItem.cartId, cartItem.productId, cartItem.productNum from (select id, name from user where email='wangad@shinetechchina.com') as User, cart, cartItem where User.id=cart.userId and cart.cartId=cartItem.cartId and cartItem.productId in (1,2)"


    // SELECT * from cart,cartItem,user where cart.cartId=cartItem.cartId and user.id=cart.userId
    // 根据用户ID查询用户购物车的内容
    // SELECT cartItem.productId from cart,cartItem,user where cart.cartId=cartItem.cartId and user.id=cart.userId and user.id = ?
    // SELECT id,( SELECT GROUP_CONCAT(c.typeName) FROM `productType` AS c WHERE FIND_IN_SET(c.id,s.type) ) FROM `product` AS s
    // 可以获取购物车内的产品信息
    // SELECT s.productId ,( SELECT GROUP_CONCAT(c.productName) FROM `product` AS c WHERE FIND_IN_SET(c.id,s.productId) ) FROM `cartItem` AS s,cart,user where cart.cartId=s.cartId and user.id=cart.userId and user.id = 1
    // SELECT cartItem.productId ,( SELECT product.productName FROM product WHERE product.id=cartItem.productId ) FROM cartItem,cart,user where cart.cartId=cartItem.cartId and user.id=cart.userId and user.id = 5
    // SELECT * FROM product AS c WHERE (SELECT i.productId FROM cartItem AS i,cart,user WHERE cart.cartId=i.cartId and user.id=cart.userId and i.productId=c.id and user.id = 5 )

    queryBanner: "SELECT * FROM banner",
    queryBrefIntro: "SELECT * FROM brefIntro",
    queryProductListBanner: "SELECT * FROM productListBanner",
    queryProductType: "SELECT * FROM product where type= ? limit 4",

    queryAllProductType: "SELECT * FROM productType",
    // 查询产品详情
    queryProductInfo: "SELECT * FROM product where id= ?",
    // 获取所有产品的类型
    queryProductTypeList: "SELECT id,( SELECT GROUP_CONCAT(c.typeName) FROM `productType` AS c WHERE FIND_IN_SET(c.id,s.type) ) FROM `product` AS s",


    // 产品
    // 分页
    queryProductByPage: "SELECT * FROM product ORDER BY id ASC limit ?,?",
    // 获取产品数量
    queryProductNum: "SELECT count(id) count FROM product ORDER BY id ASC",
    // 查询多个产品
    queryProductIn: "SELECT * FROM product WHERE id in ?",

    queryProductByType: "SELECT product.id, product.productName, product.type, productType.typeName, product.img, product.promotionMessage,  product.features, product.usedPrice, product.nowPrice FROM product, productType WHERE productType.id=product.type AND product.type=?",



    // 收货地址
    queryGoodsResInfo: "SELECT * FROM goodsResInfo where id= ? AND addressState=1",
    insertGoodsResInfo: "INSERT INTO goodsResInfo(email, userName, firstName, lastName, phoneCode, phone, province, address, postCode, addressState, createTime, updateTime) VALUES(?,?,?,?,?,?,?,?,?,1,NOW(), NOW())",
    updateGoodsResInfo: "UPDATE goodsResInfo SET email=?, firstName=?, lastName=?, phoneCode=?, phone=?, province=?, address=?, postCode=?, updateTime=NOW()",
    deleteGoodsResInfo: "UPDATE goodsResInfo SET addressState=0 WHERE id=?",

    // 根据用户登录状态查询收货地址
    quertGoodsResInfoByEmail: "SELECT * FROM goodsResInfo where email=? AND addressState=1",
    quertGoodsResInfoByUserName: "SELECT * FROM goodsResInfo where userName=? AND addressState=1",
    // 获取配送方式
    queryAllDeliveryMethod: "SELECT * FROM deliveryMethod",
    // 获取支付方式
    queryAllPayMethod: "SELECT * FROM payMethod",

    // 用户创建订单
    addOrder: "INSERT INTO orders(orderOdd, email, payMethod, payState, payTime, deliveryMethod, deliveryHopeTime, expressOdd, goodsResAddress, productList, fullPrice, orderState, createTime, updateTime) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,NOW(), NOW())",
    queryOrder: "SELECT * FROM orders WHERE id=?",
    addOrderProducts: "INSERT INTO orderProducts(orderOdd, productId, productNum, createTime, updateTime) VALUES(?,?,?,NOW(), NOW())"
    
};

module.exports = user;