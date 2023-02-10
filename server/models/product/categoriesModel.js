const { Model, DataTypes } = require('sequelize')
const sequelize = require('../../config/db.config')

class Category extends Model {}


Category.init({
    category: { 
        type: DataTypes.STRING,
        unique: true
    }
}, {
    sequelize,
    modelName: "Category"
});




module.exports = Category