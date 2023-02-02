const { Model, DataTypes } = require('sequelize')
const sequelize = require('../../config/db.config')

class User extends Model {}

User.init({
    userId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
    }
}, {
    sequelize,
    modelName: "Users"
})

module.exports = User