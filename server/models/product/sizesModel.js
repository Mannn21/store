const { Model, DataTypes } = require('sequelize')
const sequelize = require('../../config/db.config')

class Size extends Model {}

Size.init({
    size: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    sequelize,
    modelName: "Size"
})

module.exports = Size