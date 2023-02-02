const UserModel = require('../models/user/usersModel')
const response = require('../utils/response')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const uuid = require('uuid')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'userImages')
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
    try{
        const user = await UserModel.findAll()
        response(200, user, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const createUser = async (req, res) => {
    try{
        if(!req) {
            response(400, "Bad Request", "Something Wrong", "", "", res)
            return;
        }
        const create = await UserModel.create({
            userId: uuid.v4(),
            name: req.body.name,
            telp: req.body.telp
        })
        response(200, create, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const uploadImage = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const data = {
            name: req.body.name,
            image: req.file.path
        }
        const search = await UserModel.findOne({ where: { name: data.name } })
        if (!search) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        const product = await UserModel.update({ image: data.image }, { where: { id: search.id } })
        response(200, product, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

module.exports = {
    getAllUser,
    createUser,
    uploadImage,
    upload,
}