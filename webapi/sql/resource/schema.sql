create table resource
(
	id int(10) unsigned AUTO_INCREMENT
		primary key,
	type int(10) unsigned NOT NULL COMMENT '1: 图片, 2: 音乐, 3: 视频',
	title varchar(255) COMMENT '标题',
    diary_id int(10) unsigned COMMENT '文章ID',
    auth_id int(10) unsigned COMMENT '作者ID',
	seq int(10) unsigned COMMENT '顺序',
    file_path varchar(255) COMMENT '资源相对路径',
    state int(4) DEFAULT 1 COMMENT '可用状态',
	created_at datetime NULL,
	updated_at datetime NULL
)
COMMENT '资源' ENGINE=InnoDB DEFAULT CHARSET=utf8;