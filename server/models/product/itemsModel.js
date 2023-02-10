const { Model, DataTypes } = require('sequelize')
const sequelize = require('../../config/db.config')

class Item extends Model {}

Item.init({
    image: { 
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    variantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    largeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Items"
})

module.exports = Item