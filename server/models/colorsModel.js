const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')
const Product = require('./productsModel')

class Color extends Model {}


Color.init({
    color: { 
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "Color"
});




module.exports = Color