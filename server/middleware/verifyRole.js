const UserModel = require('../models/user/usersModel')
const response = require('../utils/response')

const verifyRole = async (req, res, next) => {
    try{
        const token = req.headers['authorization']
        if (!token) {
            response(400, "Bad Request", "Token not found", "", "", res)
            return;
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await UserModel.findOne({where: {id: decoded.id} })
        if(!user) {
            response(400, "Bad Request", "User not Enough", "", "", res)
            return
        }

        if(user) {
            if(user.dataValues.role !== "admin") {
                response(401, "Unauthorized", "Unauthorized", "", "", res)
                return  
            }
            if(user.dataValues.role === "admin") {
                next()
            }
        }
    }
    catch(error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

module.exports = verifyRole