const UserModel = require('../models/user/usersModel')
const response = require('../utils/response')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/userImages')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extName = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extName) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


const getAllUser = async (req, res) => {
    try {
        const user = await UserModel.findAll({
            attributes: [
                'id', 'name', 'image', 'age', 'telp'
            ]
        })
        response(200, user, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const getUserByUnique = async (req, res) => {
    try {
        const id = req.params.id
        const search = await UserModel.findOne({where: {id}})
        if(search.dataValues) {
            response(200, {name: search.dataValues.name, age: search.dataValues.age, address: search.dataValues.address}, "Request Success", "", "", res)
            return;
        }
        if(!search.dataValues) {
            response(400, "Bad Request", "User not Enough", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const createUser = async (req, res) => {
    try {
        if (!req) {
            response(400, "Bad Request", "Something Wrong", "", "", res)
            return;
        }
        const data = {
            name: req.body.name,
            telp: 0 + req.body.telp,
            password: req.body.password,
            confPassword: req.body.confPassword,
            email: req.body.email,
            age: req.body.age,
            address: req.body.address
        }
        const findNumber = await UserModel.findOne({ where: { telp: data.telp } })
        if(findNumber === null) {
            const findMail = await UserModel.findOne({ where: { email: data.email } })
            if(findMail === null) {
                if(data.password !== data.confPassword) {
                    response(404, "Password Incorrect", "Bad Request", "", "", res)
                    return
                }
                if(data.password === data.confPassword) {
                    const encryptedPw = await bcrypt.hash(data.password, 10)
                    const create = await UserModel.create({
                        name: data.name,
                        telp: data.telp,
                        password: encryptedPw,
                        email: data.email,
                        age: data.age,
                        address: data.address
                    })
                    response(200, create, "Request Success", "", "", res)
                    return 
                }
            }
            if (findMail.dataValues) {
                response(400, "Bad Request", "The Mail is Already Registered", "", "", res)
                return;
            }
        }
        if (findNumber.dataValues) {
            response(400, "Bad Request", "The Number is Already Registered", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const updateUser = async (req, res) => {
    try {
        if (!req) {
            response(400, "Bad Request", "Something Wrong", "", "", res)
            return;
        }
        const { password, newPassword, name, telp, email, age, address } = req.body
        const getUser = await UserModel.findOne({ where: { telp } })
        const compare = await bcrypt.compare(password, getUser.dataValues.password)
        const encriptedPw = await bcrypt.hash(newPassword, 10)
        if (!getUser) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        if (getUser) {
            if (!compare) {
                response(404, "Password Incorrect", "Bad Request", "", "", res)
                return;
            }
            if (compare) {
                const updateUser = await UserModel.update({ name, password: encriptedPw, telp, email, age, address }, { where: {id: getUser.dataValues.id } })
                response(200, updateUser, "Request Success", "", "", res)
                return;
            }
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const updateImage = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const data = {
            telp: req.body.telp,
            name: req.body.name,
            image: req.file.path
        }
        const search = await UserModel.findOne({ where: { name: data.name } })
        if(search.dataValues) {
            const product = await UserModel.update({ image: data.image }, { where: { id: search.id } })
            response(200, product, "Request Success", "", "", res)
            return;
        }
        if (!search) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const deleteUser = async (req, res) => {
    try {
        const name = req.body.name
        const password = req.body.password 
        const search = await UserModel.findOne({where: {name}})
        const compare = await bcrypt.compare(password, search.dataValues.password)
        if(search) {
            if(compare) {
                const filePath = search.dataValues.image
                fs.unlinkSync(filePath)
                const deleteUser = await UserModel.destroy({where: {id: search.dataValues.id}})
                response(200, deleteUser, "Request Success", "", "", res)
                return; 
            }
            if(!compare) {
                response(400, "Bad Request", "Password Incorrect", "", "", res)
                return;    
            }
        }
        if(!search) {
            response(400, "Bad Request", "User not Enough", "", "", res)
            return
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const login = async (req, res) => {
    try {
        const data = {
            telp: req.body.telp,
            password: req.body.password
        }
        if (!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const user = await UserModel.findOne({where: {telp: data.telp} })
        if(!user) {
            response(400, "Bad Request", "User not Enough", "", "", res)
            return
        }
        if(user) {
            const compare = await bcrypt.compare(data.password, user.dataValues.password)
            if(!compare) {
                response(400, "Bad Request", "Password Incorrect", "", "", res)
                return;  
            }
            if(compare) {
                const userId = user.dataValues.id
                const name = user.dataValues.name
                const email = user.dataValues.email
                const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '30s'
                })
                const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: '1d'
                })
                await UserModel.update({refresh_token: refreshToken}, {where: {id: userId}})
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
                response(200, accessToken, "Request Success", "", "", res)
                return; 
            }
        }
    } catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) {
            response(204, "No Content", "No Content", "", "", res)
            return
        }
        if(refreshToken) {
            const user = await UserModel.findOne({where: {refresh_token: refreshToken}})
            if(!user) {
                response(204, "No Content", "No Content", "", "", res)
                return
            }
            if(user) {
                const userId = user.dataValues.id
                await UserModel.update({refresh_token: null}, {where: {id: userId}})
                res.clearCookie('refreshToken')
                response(200, "Logout Success", "Request Success", "", "", res)
                return; 
            }
        }
    } catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}


module.exports = {
    getAllUser,
    getUserByUnique,
    createUser,
    updateUser,
    updateImage,
    upload,
    deleteUser,
    login,
    logout
}