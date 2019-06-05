SET NAMES utf8;
-- SET FOREIGN_KEY_CHECKS = 0;
-- CREATE DATABASE hpGraphql

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
-- DROP TABLE IF EXISTS `user`;
-- CREATE TABLE `user` 
CREATE TABLE IF NOT EXISTS user
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT '1',
  `phoneCode` int(6) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS banner
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS brefIntro
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS productListBanner
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` bigint(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS productType
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS product
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) DEFAULT NULL,
  `type` bigint(20) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `promotionMessage` varchar(255) DEFAULT NULL,
  `featrues` varchar(255) DEFAULT NULL,
  `promotionMessageSecond` varchar(255) DEFAULT NULL,
  `usedPrice` bigint(20) DEFAULT NULL,
  `nowPrice` bigint(20) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS cart
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `cartId` bigint(20) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS cartItem
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cartId` bigint(20) DEFAULT NULL,
  `productId`bigint(20) DEFAULT NULL,
  `productNum`bigint(20) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB CHARACTER SET utf8;


-- ----------------------------
--  Records of `user`
-- ----------------------------
-- BEGIN;
-- INSERT INTO `user` VALUES (1, 'admin', '1', 086, '18966823501', 'wangad@shinetechchina.com', '123456', 'shinetech', NOW(), NOW());
-- COMMIT;
-- INSERT INTO `banner` VALUES (1, 'PAVILION星系列','https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/pavilon_0219_pc_nx.jpg', '/productList/', NOW(), NOW());
-- INSERT INTO `banner` VALUES (2, '星14微边框轻薄本','https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/XINGPC-20190508.jpg', '/productList/', NOW(), NOW());
-- INSERT INTO `banner` VALUES (3, '战66二代','https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/BannerZHAN66-20190426PC.jpg', '/productList/', NOW(), NOW());
-- INSERT INTO `banner` VALUES (4, '暗影精灵4代游戏本','https://media.hpstore.cn/wysiwyg/CN_OLS/banner/public/20190403_nx.jpg', '/productList/', NOW(), NOW());

-- brefIntro
-- INSERT INTO `brefIntro` VALUES (1, '战神系列','https://adbutler-fermion.com/getad.img/;libID=653547', '/productList/123123', NOW(), NOW());
-- INSERT INTO `brefIntro` VALUES (2, '热门爆款','https://adbutler-fermion.com/getad.img/;libID=653548', '/productList/123123', NOW(), NOW());
-- INSERT INTO `brefIntro` VALUES (3, '满额立减','https://adbutler-fermion.com/getad.img/;libID=653549', '/productList/123123', NOW(), NOW());
-- INSERT INTO `brefIntro` VALUES (4, '新人礼包','https://adbutler-fermion.com/getad.img/;libID=653550', '/productList/123123', NOW(), NOW());

-- productListBanner
-- INSERT INTO `productListBanner` VALUES (1, 1, '暗影精灵4代','https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/laptop001-20190319mmq.jpg', '/productList/123123', NOW(), NOW());
-- INSERT INTO `productListBanner` VALUES (2, 2, '暗影精灵','https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/desktop001-20190319mmq.jpg', '/productList/123123', NOW(), NOW());
-- INSERT INTO `productListBanner` VALUES (3, 3, '商用打印机','https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/0222-3OfficeIPG423x689.jpg', '/productList/123123', NOW(), NOW());
-- INSERT INTO `productListBanner` VALUES (4, 4, '原装耗材','https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/0222-4Supply423x689.jpg', '/productList/123123', NOW(), NOW());
-- INSERT INTO `productListBanner` VALUES (5, 5, '显示器','https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/monitor001-20190319mmq.jpg', '/productList/123123', NOW(), NOW());
-- INSERT INTO `productListBanner` VALUES (6, 6, '酷炫装备','https://media.hpstore.cn/wysiwyg/CN_OLS/bset-sellers/ass001-20190319mmq.jpg', '/productList/123123', NOW(), NOW());

-- INSERT INTO `productType` VALUES (1, 'notebook', NOW(), NOW());
-- INSERT INTO `productType` VALUES (2, 'gamebook', NOW(), NOW());
-- INSERT INTO `productType` VALUES (3, 'printer', NOW(), NOW());
-- INSERT INTO `productType` VALUES (4, 'consumable', NOW(), NOW());
-- INSERT INTO `productType` VALUES (5, 'display', NOW(), NOW());
-- INSERT INTO `productType` VALUES (6, 'peripheral', NOW(), NOW());

-- INSERT INTO `product` VALUES (
--   1, 
--   '惠普（HP）暗影精灵4代 OMEN Laptop 15-dc0153TX 15.6英寸游戏笔记本电脑  (i5-8300H 8G 512G GTX1050Ti 4G独显 IPS FHD）',
--   1,  
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/6/K/6KL73PA-1_T1552906332.png',
--   '5月10日11点-5月11日11点，限时抢购使用优惠券:Flashsale201905106KL73PA400，数量有限，售完即止，不与其他优惠同享！',
--   '["第八代英特尔® 酷睿™ i5处理器","Windows 10 家庭版 64","512 GB PCIe® NVMe™ M.2 SSD","8 GB DDR4-2666 SDRAM","NVIDIA® GeForce® GTX 1050 Ti（4 GB GDDR5 独立显存）","15.6 英寸（对角）WLED 背光 FHD IPS 防眩光超窄边框显示屏 (1920 x 1080)"]',
--   '日常销售价6199抢购价5799',
--   6599,
--   6199,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   2, 
--   '惠普光影精灵 15-cx0068tx 游戏本',
--   1, 
--   'https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/t/m/tmt_3_4.png',
--   '',
--   '["第八代英特尔® 酷睿™ i7处理器","Windows 10 家庭版 64","1 TB SATA 硬盘 (7200 rpm)","128 GB PCIe® NVMe™ M.2 SSD","8 GB DDR4-2666 SDRAM (1 x 8 GB)","NVIDIA® GeForce® GTX 1050 Ti（4 GB GDDR5 独立显存）"]',
--   '',
--   7799,
--   6999,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   3, 
--   '惠普暗影精灵4代 15-dc0014tx 15.6 英寸游戏笔记本电脑',
--   1, 
--   'https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/p/n/png_1.png',
--   '',
--   '["第八代英特尔® 酷睿™ i7处理器","Windows 10 家庭版 64","1 TB SATA 硬盘 (7200 rpm)","256 GB PCIe® NVMe™ M.2 SSD","16 GB DDR4-2666 SDRAM (1 x 16 GB)","GeForce® GTX 1070搭载Max-Q设计（8 GB GDDR5 独立显存）"]',
--   '',
--   12499,
--   11499,
--   NOW(),
--   NOW());
-- INSERT INTO `product` VALUES (
--   4, 
--   '惠普暗影精灵4代  15-dc0124tx 15.6 英寸游戏笔记本电脑',
--   1, 
--   'https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/p/n/png.png',
--   '',
--   '["第八代英特尔® 酷睿™ i7处理器","Windows 10 家庭版 64","1 TB SATA 硬盘 (7200 rpm)","256 GB PCIe® NVMe™ M.2 SSD","16 GB DDR4-2666 SDRAM (2 x 8 GB)","NVIDIA® GeForce® GTX 1060（6 GB GDDR5 独立显存）"]',
--   '',
--   10999,
--   9399,
--   NOW(),
--   NOW());
