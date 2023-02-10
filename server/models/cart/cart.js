const {Model, DataTypes} = require('sequelize')
const sequelize = require('../../config/db.config')

class Cart extends Model {}

Cart.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ItemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    many: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: "Carts"
})

module.exports = Cart