const ProductModel = require('../models/productsModel')
const response = require('../utils/response')
const path = require('path')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extName = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extName) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

const getAllProduct = async (req, res) => {
    const product = await ProductModel.findAll()
    try {
        response(200, product, "Request Success", res)
    }
    catch ( error ) {
        response(500, error, "Server Error", res)
    }
}

const getOneProduct = async (req, res) => {
    try {
        if(!req) {
            response(400, error, "Something wrong", res)
            return;
        }
        const seriProduct = req.body.seriProduct
        const product = await ProductModel.findOne({where: {seriProduct}})
        if(product) {
            response(200, product, "Request Success", res)
        }
        if(!product) {
            response(400, "Bad Request", "Request Data Failed")
            return;
        }
    }
    catch ( error ) {
        response(500, error, "Server Error", res)
    }
}

const createProduct = async (req, res) => {
    try{
        if(!req) {
        response(400, error, "Something wrong", res)
        return;
        }
        const data = {
            seriProduct: req.body.seriProduct,
            product: req.body.product,
            price: req.body.price,
            category: req.body.category,
            color: req.body.color,
            size: req.body.size,
        }
        const product = await ProductModel.create(data)
        if(!product.dataValues) {
            response(400, "Bad Request", "Request Data Failed")
            return;
        }
        if(product.dataValues) {
            response(201, product, "Request Data Success", res)
        }
    }
    catch ( error ) {
        response( 500, error, "Server Error", res )
    }
}

const uploadImage = async (req, res) => {
    try {
        if(!req) {
            response(400, error, "Something wrong", res)
            return;
        }
        const data = {
            seriProduct: req.body.seriProduct,
            image: req.file.path
        }
        const search = await ProductModel.findOne( {where: { seriProduct: data.seriProduct } } )
        if(!search) {
            response(404, "Data not Enough", "Bad Request", res)
            return;
        }
        const product = await ProductModel.update( { image: data.image }, {where: { id: search.id } } )
        response(200, product, "Request Success", res)
    }
    catch ( error ) {
        response( 500, error, "Server Error", res )
    }
}

const updateProduct = async (req, res) => {
    try {
        if(!req) {
            response(400, error, "Something wrong", res)
            return;
        }
        const data = {
            seriProduct: req.body.seriProduct,
            product: req.body.product,
            price: req.body.price,
            category: req.body.category,
            color: req.body.color,
            size: req.body.size
        }
        const search = await ProductModel.findOne({where: {seriProduct: data.seriProduct}})
        if(search.dataValues) {
            const update = await ProductModel.update({
                product: data.product, price: data.price, category: data.category, color: data.color, size: data.size
            }, {where: {id: search.id}})
            response(200, update, "Request Success", res)
        }
        if(!search.dataValues) {
            response(404, "Data not Enough", "Bad Request", res)
            return;
        }
    } 
    catch ( error ) {
        response( 500, error, "Server Error", res )
    }
}

const updateImage = async (req, res) => {
    try{
        if(!req) {
            response(400, error, "Something wrong", res)
            return;
        }
        const data = {
            seriProduct: req.body.seriProduct,
            image: req.file.path
        }
        const search = await ProductModel.findOne( {where: { seriProduct: data.seriProduct } } )
        if(search.dataValues) {
            const filePath = search.image
            fs.unlinkSync(filePath)
            const update = await ProductModel.update({
                image: data.image
            }, {where: {id: search.id}})
            response(200, update, "Request Success", res)
        }
        if(!search.dataValues) {
            response(404, "Data not Enough", "Bad Request", res)
            return;
        }
    }
    catch ( error ) {
        response( 500, error, "Server Error", res )
    }
}

const deleteProduct = async (req, res) => {
    try{
        if(!req){
            response(400, error, "Something wrong", res)
            return;
        }
        const seriProduct = req.body.seriProduct
        const search = await ProductModel.findOne({where: {seriProduct: seriProduct}})
        if(search.dataValues) {
            const filePath = search.image
            fs.unlinkSync(filePath)
            const deleteProduct = await ProductModel.destroy({where: {seriProduct: search.seriProduct}})
            response(200, deleteProduct, "Request Success", res)
        }
        if(!search) {
            response(404, "Data not Enough", "Bad Request", res)
            return;
        }
    }
    catch ( error ) {
        response( 500, error, "Server Error", res )
    }
}


module.exports = {
    getAllProduct,
    getOneProduct,
    createProduct,
    uploadImage,
    updateProduct,
    updateImage,
    deleteProduct,
    upload
}






