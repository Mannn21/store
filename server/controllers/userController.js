const UserModel = require('../models/user/usersModel')
const response = require('../utils/response')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const uuid = require('uuid')
const express = require('express')
const router = express.Router()

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
    try {
        const user = await UserModel.findAll()
        response(200, user, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
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
            telp: req.body.telp,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
            address: req.body.address
        }
        const findNumber = await UserModel.findOne({ where: { telp: data.telp } })
        if(findNumber === null) {
            console.log("Ok")
            const findMail = await UserModel.findOne({ where: { email: data.email } })
            if(findMail === null) {
                const create = await UserModel.create({
                    userId: uuid.v4(),
                    name: data.name,
                    telp: data.telp,
                    password: data.password,
                    email: data.email,
                    age: data.age,
                    address: data.address
                })
                response(200, create, "Request Success", "", "", res)
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
    }
}

const updateUser = async (req, res) => {
    try {
        if (!req) {
            response(400, "Bad Request", "Something Wrong", "", "", res)
            return;
        }
        const { userId, password, newPassword, name, telp, email, age, address } = req.body
        const getUser = await UserModel.findOne({ where: { userId } })
        console.log(getUser)
        if (!getUser) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        if (getUser) {
            if (password !== getUser.dataValues.password) {
                response(404, "Password Incorrect", "Bad Request", "", "", res)
                return;
            }
            if (password === getUser.dataValues.password) {
                const updateUser = await UserModel.update({ name, password: newPassword, telp, email, age, address }, { where: { userId } })
                response(200, updateUser, "Request Success", "", "", res)
            }
        }
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
            userId: req.body.userId,
            name: req.body.name,
            image: req.file.path
        }
        const search = await UserModel.findOne({ where: { userId: data.userId, name: data.name } })
        if(search.dataValues) {
            const product = await UserModel.update({ image: data.image }, { where: { id: search.id } })
            response(200, product, "Request Success", "", "", res)
        }
        if (!search) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

module.exports = {
    getAllUser,
    createUser,
    updateUser,
    uploadImage,
    upload,
}