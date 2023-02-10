const { Model, DataTypes } = require('sequelize')
const sequelize = require('../../config/db.config')

class tag_product extends Model {}

tag_product.init( {
    ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    prodct: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "tag_product"
})

module.exports = tag_product

