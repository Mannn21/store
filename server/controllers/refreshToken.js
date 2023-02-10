const UserModel = require('../models/user/usersModel')
const jwt = require('jsonwebtoken')
const response = require('../utils/response')

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) {
            response(401, "Unauthorized", "Unauthorized", "", "", res)
            return
        }
        if(refreshToken) {
            const user = await UserModel.findOne({where: {refresh_token: refreshToken}})
            if(!user) {
                response(403, "Forbidden", "Forbidden", "", "", res)
                return
            }
            if(user) {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if(err) {
                        response(403, "Forbidden", "Forbidden", "", "", res)
                    return
                    }
                    const userId = user.dataValues.id
                    const name = user.dataValues.name
                    const email = user.dataValues.email
                    const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '30s'
                    })
                    response(400, accessToken, "Password Incorrect", "", "", res)
                    return; 
                })
            }
        }
    } catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

module.exports = refreshToken