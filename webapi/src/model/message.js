import Sequelize from 'sequelize';

module.exports = function (sequelize, DataTypes) {
    let UserModel = sequelize.define('Message', {
        id: {
            type: DataTypes.STRING,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true,
            defaultValue: null
        },
        sendUserId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "send_user_id"
        },
        receiveUserId: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "receive_user_id"
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        createTime: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "create_time"
        },
        readed: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            defaultValue: 0
        },
        readTime: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "read_time"
        },
        status: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: 1,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: Sequelize.NOW,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: Sequelize.NOW,
            field: 'updated_at'
        }
    }, {
        tableName: 'message',
        timestamps: false
    });

    return UserModel;
}