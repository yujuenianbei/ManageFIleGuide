# 用户添加购物车流程

<!-- 添加 -->
1. 判断用户购物车列表里面有没有数据（searchCartUser）
    没有（10）
    有（11）

10. 创建购物车（cart,cartItem两个表）
    需要用户ID, 随机生成的cartID, productID

11. 根据用户ID查询cart 有对应的cartID
    再根据productID是否在cartItem这个表内部
    没有（110）
    有（111）

110. 没有则插入新的数据

111. 有则调用更新接口 对数量进行递增

<!-- 减少数量 -->
1. 根据用户ID查询cart 
    如果productNum为1 则调用删除cartItem方法
        如果cartItem当前数量为1 则进行删除操作
        如果cartItem当前数量不为1 则不进行删除操作
    如果productNum大于1 则调用更新cartItem方法
        不对cartItem 进行操作

<!-- 删除购物车 -->
