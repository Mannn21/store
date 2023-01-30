const ProductModel = require('../models/productsModel')
const VariantModel = require('../models/variantProduct')
const LargeModel = require('../models/largeProduct')
// const CategoryModel = require('../models/categoriesModel')
const SizeModel = require('../models/sizesModel')
const ColorModel = require('../models/colorsModel')
const response = require('../utils/response')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const uuid = require('uuid')


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

// ================================================= GET DATAS ============================================================

const getAllProduct = async (req, res) => {
    const product = await ProductModel.findAll()
    try {
        response(200, product, "Request Success", res)
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}

const getOneProduct = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", res)
            return;
        }
        const seriProduct = req.body.seriProduct
        const product = await ProductModel.findOne({ where: { seriProduct } })
        if (product) {
            response(200, product, "Request Success", res)
        }
        if (!product) {
            response(400, "Bad Request", "Request Data Failed")
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}

// ============================================================== CREATE PRODUCT ===================================================

const createProduct = async (req, res) => {
    try {
        if (!req) {
            response(400, "error", "Something wrong", res)
            return;
        }
        const product = await ProductModel.create({
            ProductId: uuid.v4(),
            product: req.body.product,
            price: req.body.price,
        })
        if (!product.dataValues) {
            response(404, "Request Data Failed", "Bad Request", res)
            return;
        }
        response(200, product, "Request Success", res)
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}

const createColor = async (req, res) => {
    try {
        const color = await ColorModel.create({ color: req.body.color })
        response(200, color, "Request Success", res)
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}

const createSize = async (req, res) => {
    try {
        const size = await SizeModel.create({ size: req.body.size })
        response(200, size, "Request Success", res)
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}

// ============================================================== CREATE RELATIONS =================================================

const relationProductColor = async (req, res) => {
    try {
        const product = await ProductModel.findOne({ where: { product: req.body.product } })
        const color = await ColorModel.findOne({ where: { color: req.body.color } })

        await color.addProduct(product);
        await product.addVariant(color);
        response(200, "Ok", "Success", res)
    }
    catch (error) {
        response(500, error, "False", res)
    }
}

const relationProductSize = async (req, res) => {
    try {
        const product = await ProductModel.findOne({ where: { product: req.body.product } })
        const size = await SizeModel.findOne({ where: { size: req.body.size } })

        // console.log(product, size)
        await size.addModel(product);
        await product.addLarge(size);
        response(200, "Ok", "Success", res)
    }
    catch (error) {
        response(500, error, "False", res)
    }
}

// =============================================================== UPLOAD IMAGE ===================================================

const uploadImage = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", res)
            return;
        }
        const data = {
            seriProduct: req.body.seriProduct,
            image: req.file.path
        }
        const search = await ProductModel.findOne({ where: { seriProduct: data.seriProduct } })
        if (!search) {
            response(404, "Data not Enough", "Bad Request", res)
            return;
        }
        const product = await ProductModel.update({ image: data.image }, { where: { id: search.id } })
        response(200, product, "Request Success", res)
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}

//  ================================================ UPDATE DATAS ===================================================================

const updateProduct = async (req, res) => {
    try {
        if (!req) {
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
        const search = await ProductModel.findOne({ where: { seriProduct: data.seriProduct } })
        if (search.dataValues) {
            const update = await ProductModel.update({
                product: data.product, price: data.price, category: data.category, color: data.color, size: data.size
            }, { where: { id: search.id } })
            response(200, update, "Request Success", res)
        }
        if (!search.dataValues) {
            response(404, "Data not Enough", "Bad Request", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}

const updateImage = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", res)
            return;
        }
        const data = {
            seriProduct: req.body.seriProduct,
            image: req.file.path
        }
        const search = await ProductModel.findOne({ where: { seriProduct: data.seriProduct } })
        if (search.dataValues) {
            const filePath = search.image
            fs.unlinkSync(filePath)
            const update = await ProductModel.update({
                image: data.image
            }, { where: { id: search.id } })
            response(200, update, "Request Success", res)
        }
        if (!search.dataValues) {
            response(404, "Data not Enough", "Bad Request", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}

// =========================================================== UPDATE STOCK ==============================================================

const updateVariantModel = async (req, res) => {
    try {
        if(!req) {
            response(400, error, "Something wrong", res)
            return;
        }
        const data = {
            product: req.body.product,
            color: req.body.color,
            stock: req.body.stock
        }
        const productId = await ProductModel.findOne({ where: {product: data.product}})
        const colorId = await ColorModel.findOne({ where: {color: data.color}})
        if(!productId.dataValues.id && !colorId.dataValues.id) {
            response(404, "Data not Enough", "Bad Request", res)
            return;
        }
        const search = await VariantModel.findOne({ where: {productId: productId.dataValues.id, colorId: colorId.dataValues.id} })
            if(!search) {
                response(404, "Data not Enough", "Bad Request", res)
                return;
            }
            const update = await VariantModel.update({ stock: data.stock }, {where : {id: search.dataValues.id}})
            response(200, update, "Request Success", res)
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}

const updateLargeModel = async (req, res) => {
    try {
        if(!req) {
            response(400, error, "Something wrong", res)
            return;
        }
        const data = {
            size: req.body.size,
            product: req.body.product,
            stock: req.body.stock
        }
        const productId = await ProductModel.findOne({ where: { product: data.product } })
        const sizeId = await SizeModel.findOne({ where: { size: data.size } })
        if(!productId.dataValues.id && !sizeId.dataValues.id) {
            response(404, "Data not Enough", "Bad Request", res)
            return;
        }
        const search = await LargeModel.findOne({ where: {productId: productId.dataValues.id, sizeId: sizeId.dataValues.id}})
        if(!search) {
            response(404, "Data not Enough", "Bad Request", res)
            return;
        }
        const update = await LargeModel.update({ stock: data.stock}, { where: {id: search.id}})
        response(200, update, "Request Success", res)
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}

// ====================================================== DELETE DATAS ============================================================

const deleteProduct = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", res)
            return;
        }
        const seriProduct = req.body.seriProduct
        const search = await ProductModel.findOne({ where: { seriProduct: seriProduct } })
        if (search.dataValues) {
            const filePath = search.image
            fs.unlinkSync(filePath)
            const deleteProduct = await ProductModel.destroy({ where: { seriProduct: search.seriProduct } })
            response(200, deleteProduct, "Request Success", res)
        }
        if (!search) {
            response(404, "Data not Enough", "Bad Request", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}


module.exports = {
    getAllProduct,
    getOneProduct,
    createProduct,
    createColor,
    createSize,
    // createCategory,
    uploadImage,
    updateProduct,
    updateImage,
    updateVariantModel,
    updateLargeModel,
    deleteProduct,
    relationProductColor,
    relationProductSize,
    upload
}






