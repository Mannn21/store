const { Model, DataTypes } = require('sequelize')
const sequelize = require('../../config/db.config')

class Color extends Model {}


Color.init({
    color: { 
        type: DataTypes.STRING,
        unique: true
    }
}, {
    sequelize,
    modelName: "Color"
});




module.exports = Color