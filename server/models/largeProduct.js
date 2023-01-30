const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/db.config')

class size_product extends Model {}

size_product.init({
    ProductId: {
        type: DataTypes.INTEGER
    },
    SizeId: {
        type: DataTypes.INTEGER
    },
    stock: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: "size_product"
})

module.exports = size_product