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
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `updateTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = INNODB CHARACTER SET utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
-- BEGIN;
-- INSERT INTO `user` VALUES ('1', 'admin', '1', '08618966823501', 'wangad@shinetechchina.com', '123456', 'shinetech', NOW(), NOW());
-- COMMIT;
