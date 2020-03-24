-- create database if not exists `ooplover` default charset utf8 collate utf8_general_ci;

CREATE TABLE user
(
	id int(10) unsigned AUTO_INCREMENT
		primary key,
	name varchar(255) NOT NULL comment '组名',
	password_hash varchar(255) NULL,
	avator varchar(255) NULL,
	created_at datetime NULL,
	updated_at datetime NULL
)
COMMENT '用户表' ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table user_tracking
(
	id int(10) unsigned AUTO_INCREMENT
		primary key,
	user_id int(10) unsigned NOT NULL,
	token varchar(255) NOT NULL COMMENT 'Token',
	created_at datetime NULL,
	updated_at datetime NULL
)
COMMENT '用户追踪' ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table message
(
	id int(10) unsigned AUTO_INCREMENT primary key,
	send_user_id int(10),
	receive_user_id int(10),
	content TEXT,
	create_time varchar(255) NULL,
	readed TINYINT(4) DEFAULT 0,
	read_time varchar(255) NULL,
	status TINYINT(4) DEFAULT 1,
	created_at datetime NULL,
	updated_at datetime NULL
) COMMENT '消息' ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO user (id, name, password_hash ) VALUES (1, 'XHM', '$2a$10$m3jO3Ncd3/EJKvKZGn10J.U4HNY3F/IucloI7m8ILPoOP7mIJt5.a');
INSERT INTO user (id, name, password_hash ) VALUES (2, 'DHL', '$2a$10$m3jO3Ncd3/EJKvKZGn10J.U4HNY3F/IucloI7m8ILPoOP7mIJt5.a');