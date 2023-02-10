const { Model, DataTypes } = require('sequelize')
const sequelize = require('../../config/db.config')
const Color = require('./colorsModel')
const Size = require('./sizesModel')
const Category = require('./categoriesModel')

class Product extends Model {}


Product.init({
    product: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    color: {
        type: DataTypes.STRING
    },
    size: {
        type: DataTypes.STRING
    },
    category: {
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

Product.belongsToMany(Category, {through: "tag_products", as: "tag"})
Category.belongsToMany(Product, {through: "tag_products", as: "product"})


module.exports = Product