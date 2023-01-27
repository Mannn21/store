const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

class Products extends Model{}

Products.init({
    seriProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.STRING
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING
    },
    size: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "Products"
})

module.exports = Products