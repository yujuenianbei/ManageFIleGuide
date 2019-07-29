# 收货信息

## 通过邮箱和用户信息关联
0. id
1. 邮箱 email
2. 姓 lastName
3. 名 firstName
4. 区号 phoneCode
5. 电话 phone
6. 省市区 province
7. 详细地址 address
8. 邮政编码 postCode
9. 地址状态 addressState
10. 创建时间 createTime
11. 更新时间 updateTime


    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) DEFAULT NULL,
    `firstName` varchar(255) DEFAULT NULL,
    `lastName` varchar(255) DEFAULT NULL,
    `phoneCode` int(6) DEFAULT NULL,
    `phone` varchar(20) DEFAULT NULL,
    `province` varchar(255) DEFAULT NULL,
    `address` varchar(255) DEFAULT NULL,
    `postCode` bigint(20) DEFAULT NULL,
    `addressState` bigint(20) DEFAULT NULL,   1.常用（显示给用户的）  2.临时（后台可以看到的）
    `createTime` datetime NOT NULL,
    `updateTime` datetime NOT NULL,