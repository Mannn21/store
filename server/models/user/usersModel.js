const { Model, DataTypes } = require('sequelize')
const sequelize = require('../../config/db.config')

class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.TEXT,
    },
    age: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Users"
})

module.exports = User