const { Model, DataTypes } = require('sequelize')
const sequelize = require('../../config/db.config')

class Category extends Model {}


Category.init({
    category: { 
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "Category"
});




module.exports = Category