const {Model, DataTypes} = require('sequelize')
const sequelize = require('../../config/db.config')

class size_product extends Model {}

size_product.init({
    ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    SizeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    size: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "size_product"
})

module.exports = size_product