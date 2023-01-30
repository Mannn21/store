const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/db.config')

class variant_product extends Model {}

variant_product.init({
    ProductId: {
        type: DataTypes.INTEGER
    },
    ColorId: {
        type: DataTypes.INTEGER
    },
    stock: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: "variant_product"
})

module.exports = variant_product