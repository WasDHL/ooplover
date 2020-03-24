// CREATE TABLE `user_tracking` (
//     `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
//     `user_id` int(10) unsigned NOT NULL,
//     `token` varchar(255) NOT NULL COMMENT 'Token',
//     `created_at` datetime DEFAULT NULL,
//     `updated_at` datetime DEFAULT NULL,
//     PRIMARY KEY (`id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户追踪';

// import Sequelize from 'sequelize';

module.exports = function (sequelize, DataTypes) {
    let UserTrackingModel = sequelize.define('UserTracking', {
        id: {
            type: DataTypes.STRING,
            allowNull: true,
            autoIncrement: false,
            primaryKey: true,
            defaultValue: null
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: null
        },
        token: {
            type: DataTypes.STRING(64),
            allowNull: true,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: null
        }
    }, {
        tableName: 'user_tracking',
        timestamps: false
    });

    return UserTrackingModel;
}