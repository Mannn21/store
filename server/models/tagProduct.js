const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')

class tag_product extends Model {}

tag_product.init( {
    ProductId: {
        type: DataTypes.INTEGER
    },
    CategoryId: {
        type: DataTypes.INTEGER
    },
    stock: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: "tag_product"
})

module.exports = tag_product

