const {Model, DataTypes} = require('sequelize')
const sequelize = require('../../config/db.config')

class variant_product extends Model {}

variant_product.init({
    ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ColorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "variant_product"
})

module.exports = variant_product