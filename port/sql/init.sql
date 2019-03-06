
CREATE TABLE IF NOT EXISTS leftList
(
    `id` bigint(20) NOT NULL,
    list_type varchar(32),
    list_name varchar(255),
    list_link varchar(255),
    list_parent_id varchar(1000),
    create_time datetime not null,
    update_time datetime not null,
    PRIMARY KEY (`id`)
)ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS userList
(
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    user_name varchar(32) not null,
    user_password varchar(255),
    user_realname varchar(255),
    user_birthday date not null,
    user_id  varchar(1000),
    create_time datetime not null,
    update_time datetime not null,
    PRIMARY KEY (`id`)
)ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS SONGLIST
(
    `song_id` bigint(20) NOT NULL AUTO_INCREMENT,
    song_name varchar(128),
    author_name varchar(255),
    album_name varchar(255),
    song_img varchar(1000),
    song_time varchar(255),
    song_url varchar(1000),
    album_data varchar(255),
    create_time datetime not null,
    update_time datetime not null,
    PRIMARY KEY (`song_id`)
)ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS LYRIClIST
(
    `lyric_id` bigint(20) NOT NULL AUTO_INCREMENT,
    song_id bigint(20),
    lyric_content varchar(5000),
    create_time datetime not null,
    update_time datetime not null,
    PRIMARY KEY (`lyric_id`)
)ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS IMGLIST
(
    `img_id` bigint(20) NOT NULL AUTO_INCREMENT,
    img_name varchar(128),
    img_top boolean not null,
    img_img varchar(1000),
    create_time datetime not null,
    update_time datetime not null,
    PRIMARY KEY (`img_id`)
)ENGINE = INNODB CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS VIDEOLIST
(
    `video_id` bigint(20) NOT NULL AUTO_INCREMENT,
    video_name varchar(128),
    author_name varchar(255),
    album_name varchar(255),
    video_img varchar(1000),
    video_time varchar(255),
    video_url varchar(1000),
    album_data varchar(255),
    create_time datetime not null,
    update_time datetime not null,
    PRIMARY KEY (`video_id`)
)ENGINE = INNODB CHARACTER SET utf8;




-- CREATE TABLE IF NOT EXISTS t_operation
-- (
--     id varchar(32) not null unique primary key,
--     system_id varchar(32) not null,
--     name varchar(128) not null,
--     description varchar(256),
--     type varchar(32) not null,
--     is_global boolean not null,
--     create_time datetime not null,
--     modify_time datetime not null
-- )ENGINE = INNODB CHARACTER SET utf8;

-- CREATE TABLE IF NOT EXISTS t_operation_info
-- (
--     id varchar(32) not null unique primary key,
--     operation_id varchar(32) not null,
--     region varchar(255),
--     url varchar(1000) not null,
--     create_time datetime not null,
--     modify_time datetime not null,
--     UNIQUE KEY (operation_id, region)
-- )ENGINE = INNODB CHARACTER SET utf8;

-- CREATE TABLE IF NOT EXISTS t_operation_type
-- (
--     id varchar(32) not null unique primary key,
--     name varchar(128) not null,
--     create_time datetime not null,
--     modify_time datetime not null
-- )ENGINE = INNODB CHARACTER SET utf8;

-- CREATE TABLE IF NOT EXISTS t_operation_sense
-- (
--     id varchar(32) not null unique primary key,
--     name varchar(128) not null,
--     description varchar(256),
--     operation_order VARCHAR(1000),
--     is_show boolean not null,
--     icon text,
--     create_time datetime not null,
--     modify_time datetime not null
-- )ENGINE = INNODB CHARACTER SET utf8;

-- CREATE TABLE IF NOT EXISTS t_operation_map_type
-- (
--     id varchar(32) not null unique primary key,
--     name varchar(128) not null,
--     level tinyint(1) not null,
--     parent varchar(32),
--     status tinyint(1) not null,
--     icon text,
--     create_time datetime not null,
--     modify_time datetime not null
-- )ENGINE = INNODB CHARACTER SET utf8;

-- CREATE TABLE IF NOT EXISTS t_operation_map_info
-- (
--     id varchar(32) not null unique primary key,
--     name varchar(128) not null,
--     url varchar(1000) not null,
--     type varchar(32) not null,
--     status tinyint(1) not null,
--     create_time datetime not null,
--     modify_time datetime not null
-- )ENGINE = INNODB CHARACTER SET utf8;

-- CREATE TABLE IF NOT EXISTS `t_visit_history` (
--   `id` bigint(20) NOT NULL AUTO_INCREMENT,
--   `type` tinyint(1) NOT NULL,
--   `type_id` varchar(32)  NOT NULL,
--   `operation_id` varchar(32),
--   `user_name` varchar(32) NOT NULL,
--   `visit_time` datetime NOT NULL,
--   `leave_time` datetime,
--   PRIMARY KEY (`id`),
--   KEY `type` (`type`) USING BTREE,
--   KEY `type_id` (`type_id`) USING BTREE
-- )ENGINE=InnoDB CHARACTER SET utf8;