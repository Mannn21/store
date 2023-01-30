const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')
const Color = require('./colorsModel')
const Size = require('./sizesModel')

class Product extends Model {}


Product.init({
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
    color: {
        type: DataTypes.STRING
    },
    size: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "Products"
}); 


Color.belongsToMany(Product, {through: "variant_products", as: "product"})
Product.belongsToMany(Color, {through: "variant_products", as: "variant"})

Product.belongsToMany(Size, {through: "size_products", as: "large"})
Size.belongsToMany(Product, {through: "size_products", as: "model"})


module.exports = Product