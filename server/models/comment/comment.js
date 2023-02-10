const { Model, DataTypes } = require('sequelize')
const sequelize = require('../../config/db.config')

class Comment extends Model {}

Comment.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Comments"
})

module.exports = Comment