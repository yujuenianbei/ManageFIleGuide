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
  `uuid` varchar(255) NOT NULL,
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


CREATE TABLE IF NOT EXISTS account
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `sex` int(2) DEFAULT 1,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
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
  `featrues` varchar(2550) DEFAULT NULL,
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

-- 二维码登录
CREATE TABLE IF NOT EXISTS qrcode
(
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) DEFAULT NULL,
  `uid` varchar(255) NOT NULL,
  `state`bigint(20) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  UNIQUE (`uid`),
  PRIMARY KEY (`id`)
) ENGINE = INNODB CHARACTER SET utf8;


-- INSERT INTO qrcode(uid,state)  
-- SELECT 'b8466408-20b7-460c-8907-9fbca82eaba0', 2
-- FROM qrcode  
-- WHERE NOT EXISTS(  
--       SELECT *  
--       FROM qrcode  
--       WHERE uid = 'b8466408-20b7-460c-8907-9fbca82eaba1'
-- );

-- ----------------------------
--  Records of `user`
-- ----------------------------
-- BEGIN;
-- INSERT INTO `user` VALUES (1, REPLACE(UUID(), "-", ""), 'admin', '1', 086, '18966823501', 'wangad@shinetechchina.com', '123456', 'shinetech',NOW(), NOW());
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


-- ----------------------------
--  Records of `product`
-- ----------------------------
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


-- INSERT INTO `product` VALUES (
--   5, 
--   '惠普暗影精灵3   690-078ccn游戏台式电脑（i7-8700 16G高频 1T+256GSSD GTX1060 6G独显 三年上门）',
--   2,  
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/c/a/catalog-product-n-e-nelson_p_gaming_front_2.png',
--   '5月27日10点-5月29日10点，限时抢购，数量有限，售完即止，不与其他优惠同享！',
--   '["第八代英特尔® 酷睿™ i7处理器","Windows 10 家庭版 64","16 GB DDR4-2666 SDRAM (2 x 8 GB)","1 TB SATA 硬盘 (7200 rpm)","英特尔® UHD 630 显卡","NVIDIA® GeForce® GTX 1060（6 GB GDDR5 独立显存）"]',
--   '日常销售价7999抢购价7499',
--   8199,
--   7499,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   6, 
--   '惠普（HP）小欧24-f031 商务娱乐高清一体机电脑23.8英寸（八代i3-8130U 8G 1T UMA WiFi蓝牙）FHD',
--   2, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/6/D/6DW53AA-1_T1555385248.png',
--   '高72%NTSC高色域   全高清IPS  大功率音响',
--   '["Windows 10 家庭版 64","第八代英特尔® 酷睿™ i3处理器","8 GB DDR4-2400 SDRAM (1 x 8 GB)","1 TB SATA 硬盘 (7200 rpm)","英特尔® UHD 620 显卡"]',
--   '',
--   4399,
--   4099,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   7, 
--   '惠普（HP）小欧290 商务办公台式电脑主机（i3-8100 4G 1TB WiFi串口 Win10 ）',
--   2, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/4/E/4EA08AA-1_T1555384797.png',
--   '纤细机身 充沛动能 丰富接口 高效办公',
--   '["Windows 10 家庭版 64","第八代英特尔® 酷睿™ i3处理器","4 GB DDR4-2400 SDRAM (1 x 4 GB)","1 TB SATA 硬盘 (7200 rpm)","英特尔® UHD 630 显卡"]',
--   '',
--   2999,
--   2699,
--   NOW(),
--   NOW());
-- INSERT INTO `product` VALUES (
--   8, 
--   '惠普战 99 Pro G1 台式电脑',
--   2, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/5/M/5MY94PA-1_T1545710096.png',
--   '战66 AMD新品火爆来袭，晒单还赠包鼠！点击查看：',
--   '["Windows 10 家庭版 64 – 惠普建议使用 Windows 10 Pro。","第八代英特尔® 酷睿™ i5处理器","8 GB DDR4-2666 SDRAM (1 X 8 GB)","1 TB SATA 硬盘 (7200 rpm)","NVIDIA® GeForce® GTX 1060（3 GB GDDR5 独立显存）"]',
--   '年中采购节，惊喜优惠券限量秒，使用优惠券: MayPro201905200620BPC300下单即可享300元优惠，抢完即止。',
--   null,
--   5999,
--   NOW(),
--   NOW());


-- INSERT INTO `product` VALUES (
--   9, 
--   'HP LaserJet Pro M17w 打印机',
--   3,  
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/Y/5/Y5S47A-1_T1544696674.png',
--   '领取5月限量优惠券，先到先得',
--   '["Functions: 打印","Apple AirPrint™; Google Cloud Print™; Wireless direct printing"]',
--   '5月订单满599减12；满1999减45；',
--   979,
--   899,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   10, 
--   'HP LaserJet Pro M132nw 多功能一体机',
--   3, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/G/3/G3Q62A-1_T1539226532.png',
--   '领取5月限量优惠券，先到先得',
--   '["Functions: 打印、复印、扫描"]',
--   '5月订单满599减12；满1999减45；',
--   2399,
--   1499,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   11, 
--   'HP OfficeJet Pro 6960 多功能一体机',
--   3, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/J/7/J7K33A-1_T1539225863.png',
--   '领取5月限量优惠券，先到先得',
--   '["Functions: 打印、复印、扫描、传真","Print Speed (Black): 高达 30 页/分钟","Apple AirPrint™; Ethernet networking; HP ePrint; Mopria™; USB; Wireless (Wi-Fi®); Wireless direct printing","Automatic document feeder; Front USB flash drive port; Print from mobile device; Scan to email; Scan to PDF; Two-sided printing; Two-sided scanning"]',
--   '5月订单满599减12；满1999减45；',
--   2099,
--   1099,
--   NOW(),
--   NOW());
-- INSERT INTO `product` VALUES (
--   12, 
--   'HP Ink Tank 319 ',
--   3, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/Z/6/Z6Z13A-1_T1542177284.png',
--   '领取5月限量优惠券，先到先得',
--   '["Functions: 打印、复印、扫描","Print Speed (Black): 高达 19 页/分钟","USB","Ink tank system; Scan to PDF"]',
--   '5月订单满599减12；满1999减45；',
--   null,
--   1299,
--   NOW(),
--   NOW());


-- INSERT INTO `product` VALUES (
--   13, 
--   'HP LaserJet 18A 黑色原装硒鼓',
--   4,  
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/C/F/CF218A-1_T1539226626.png',
--   '领取5月限量优惠券，先到先得',
--   '["Cartridge Colors: Black","Print Technology: Laser","Product type: 标准容量墨盒"]',
--   '5月耗材订单满399减20；满999减50；',
--   null,
--   411,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   14, 
--   'HP LaserJet 56A 黑色原装硒鼓',
--   4, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/C/F/CF256A-1_T1539225585.png',
--   '领取5月限量优惠券，先到先得',
--   '["Cartridge Colors: Black","Print Technology: Laser","Product type: 标准容量墨盒"]',
--   '5月耗材订单满399减20；满999减50；',
--   null,
--   279,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   15, 
--   'HP 678 号 2 件套黑色/三色原装 Ink Advantage 墨盒',
--   4, 
--   'https://media.hpstore.cn/catalog/product/cache/c58b88357feb47e1e90e0994b7c41391/t/m/tmt_3_1.png',
--   '领取5月限量优惠券，先到先得',
--   '["Cartridge Colors: Black; Tri-color","Print Technology: Ink","Product type: 组合包"]',
--   '5月耗材订单满399减20；满999减50；',
--   122,
--   106,
--   NOW(),
--   NOW());
-- INSERT INTO `product` VALUES (
--   16, 
--   '惠普 932XL 黑色/933XL 青色/品红色/黄色 4 件套原装墨盒',
--   4, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/T/0/T0A80AA-1_T1539228420.jpg',
--   '领取5月限量优惠券，先到先得',
--   '["硬件兼容性: HP Officejet 6100 云打印机、HP Officejet 6600 云多功能一体机、HP Officejet 6700 Premium 云多功能一体机、HP Officejet 7110 宽幅云打印机、HP Officejet 7610 宽幅云多功能一体机"]',
--   '5月耗材订单满399减20；满999减50；',
--   null,
--   569,
--   NOW(),
--   NOW());


-- INSERT INTO `product` VALUES (
--   17, 
--   'HP 24o 24 英寸 LED 背光显示器',
--   5,  
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/X/9/X9K72AA-1_T1531207907.png',
--   '5月23日-5月30日限时抢购，数量有限，售完即止，',
--   '["鲜活的视觉体验","轻松连接","消除运动模糊现象","全高清显示屏 / 1080p 显示屏","明亮的 24 英寸对角全高清显示屏，帮助增强游戏和电影效果。[1]","带 VGA、DVI 和 HDMI 端口，可轻松连接您的设备，无需使用适配器。","2 毫秒响应时间，杜绝游戏、视频和电影的不稳定现象。[2]"]',
--   '日常销售价999抢购价799',
--   1149,
--   799,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   18, 
--   'HP 27y 27 英寸显示屏',
--   5, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/2/G/2GB27AA-1_T1533274603.png',
--   '5月23日-5月30日限时抢购，数量有限，售完即止，',
--   '["图片清晰明亮","品质优良，全无死角","适合当今时代的连接性","27 英寸（对角）全高清[1] 屏幕，支持显示各类文档、视频和电子邮件，呈现出的效果色彩逼真、细节清晰。","这款 27 英寸（对角）IPS 显示屏具有 178° 的广阔视角，能够提供更优质娱乐体验。","借助 VGA、DVI 和 HDMI 端口方便地连接您的设备。"]',
--   '日常销售价1299抢购价1099',
--   1399,
--   1099,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   19, 
--   '惠普（HP）25X 暗影精灵 24.5英寸 FHD分辨率 144Hz游戏电竞 电脑液晶爱眼显示器',
--   5, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/3/W/3WL51AA-1_T1533276610.png',
--   '5月23日-5月30日限时抢购，数量有限，售完即止，',
--   '["飞快速度应你所想","顺畅画质令人惊艳","舒适感","采用 Overdrive 技术，实现 1 毫秒响应时间","144 赫兹刷新率和 1 毫秒响应时间，可消除屏幕撕裂和运动模糊现象。[1]","显示屏采用 AMD® FreeSync™[2] 技术，为您带来不同凡响的流畅游戏体验。","可调节范围达 100 毫米，让您可以轻松地将显示屏调节到舒适高度。"]',
--   '日常销售价1599抢购价1499',
--   1699,
--   1499,
--   NOW(),
--   NOW());
-- INSERT INTO `product` VALUES (
--   20, 
--   '惠普（HP）星系列 27FW 27英寸 FHD高分辨率 低蓝光爱眼 电脑办公显示器屏',
--   5, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/3/K/3KS65AA-1_T1547113222.png',
--   '5月23日-5月30日限时抢购，数量有限，售完即止，',
--   '["迷人的超薄设计","无边框设计效果出众","提供多种娱乐功能","超窄边框显示屏","这款超薄显示屏让您无需支付高昂的费用即可享受现代质感。","这款微边框显示屏配备色彩艳丽的 IPS 面板，可提供超宽的可视角度和清晰锐利的画质。","配备全高清[1] 分辨率和 AMD FreeSync™[2]，让您尽享毫无模糊和延迟的清晰画质和游戏效果。"]',
--   '5月耗材订单满399减20；满999减50；',
--   null,
--   569,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   21, 
--   '惠普 Z3700 银色无线鼠标',
--   6,  
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/X/7/X7Q44AA-1_T1539224592.png',
--   '',
--   '["别具匠心的设计","无线便利性","持久的电池续航时间"]',
--   '',
--   null,
--   99,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   22, 
--   '惠普暗影精灵鼠标 600',
--   6, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/1/K/1KF75AA-1_T1539224526.png',
--   '',
--   '["准确移动","瞬时设置","自由定义理想重量"]',
--   '',
--   299,
--   249,
--   NOW(),
--   NOW());

-- INSERT INTO `product` VALUES (
--   23, 
--   '惠普暗影精灵耳机 800',
--   6, 
--   'https://media.hpstore.cn/catalog/product/cache/3fc35d798ea034524abc6812c3526e1f/1/K/1KF76AA-1_T1539224519.png',
--   '',
--   '["沉浸式音效","多维音效","出色舒适度"]',
--   '',
--   399,
--   369,
--   NOW(),
--   NOW());
