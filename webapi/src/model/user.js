// import Sequelize from 'sequelize';

module.exports = function (sequelize, DataTypes) {
    let UserModel = sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true,
            defaultValue: null
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: null
        },
        avator: {
            type: DataTypes.STRING,
            allowNull: true,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: null
        },
        passwordHash: {
            type: DataTypes.STRING(64),
            allowNull: true,
            autoIncrement: false,
            primaryKey: false,
            defaultValue: null,
            field: "password_hash"
        }
    }, {
        tableName: 'user',
        timestamps: false
    });

    return UserModel;
}