const ProductModel = require('../models/productsModel')
const VariantModel = require('../models/variantProduct')
const LargeModel = require('../models/largeProduct')
const TagModel = require('../models/tagProduct')
const CategoryModel = require('../models/tagsModel')
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
    const limit = req.query.limit || 2;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const product = await ProductModel.findAll({
        limit,
        offset,
        include: [
            {
                model: ColorModel,
                as: "variant"
            },
            {
                model: SizeModel,
                as: "large"
            },
            {
                model: CategoryModel,
                as: "tag"
            }
        ]
    })
    try {
        const meta = {
            prev: page > 1 ? `http://localhost:3000?page=${page - 1}&limit=${limit}` : "",
            next: product.length === limit ? `http://localhost:3000?page=${page + 1}&limit=${limit}` : ""
            }
        response(200, product, "Request Success", meta.next, meta.prev, res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const getAllColor = async (req, res) => {
    const color = await ColorModel.findAll()
    try {
        response(200, color, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const getAllCategory = async (req, res) => {
    const category = await CategoryModel.findAll()
    try {
        response(200, category, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const getAllSize = async (req, res) => {
    const size = await SizeModel.findAll()
    try {
        response(200, size, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const getOneProduct = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const seriProduct = req.body.seriProduct
        const product = await ProductModel.findOne({ where: seriProduct })
        if (product) {
            response(200, product, "Request Success", "", "", res)
        }
        if (!product) {
            response(400, "Bad Request", "Request Data Failed", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

// ============================================================== CREATE PRODUCT ===================================================

const createProduct = async (req, res) => {
    try {
        if (!req) {
            response(400, "error", "Something wrong", "", "", res)
            return;
        }
        const product = await ProductModel.create({
            ProductId: uuid.v4(),
            product: req.body.product,
            price: req.body.price,
        })
        if (!product.dataValues) {
            response(404, "Request Data Failed", "Bad Request", "", "", res)
            return;
        }
        response(200, product, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const createColor = async (req, res) => {
    try {
        if (!req) {
            response(400, "error", "Something wrong", "", "", res)
            return;
        }
        const color = await ColorModel.create({ color: req.body.color })
        if (!color.dataValues) {
            response(404, "Request Failed", "Bad Request", "", "", res)
            return;
        }
        response(200, color, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const createSize = async (req, res) => {
    try {
        if (!req) {
            response(400, "error", "Something Wrong", "", "", res)
            return;
        }
        const size = await SizeModel.create({ size: req.body.size })
        if (!size.dataValues) {
            response(404, "Request Failed", "Bad Request", "", "", res)
            return;
        }
        response(200, size, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const createCategory = async (req, res) => {
    try {
        if (!req) {
            response(400, "error", "Something Wrong", "", "", res)
            return;
        }
        const category = await CategoryModel.create({ category: req.body.category })
        if (!category.dataValues) {
            response(404, "Request Failed", "Bad Request", "", "", res)
            return;
        }
        response(200, category, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

// ============================================================== CREATE RELATIONS =================================================

const relationProductColor = async (req, res) => {
    try {
        if (!req) {
            response(400, "Error", "Something Wrong", "", "", res)
            return;
        }
        const product = await ProductModel.findOne({ where: { product: req.body.product } })
        const color = await ColorModel.findOne({ where: { color: req.body.color } })
        if (!product.dataValues && !color.dataValues) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        await color.addProduct(product);
        await product.addVariant(color);
        response(200, "Ok", "Success", "", "", res)
    }
    catch (error) {
        response(500, error, "False", "", "", res)
    }
}

const relationProductSize = async (req, res) => {
    try {
        if (!req) {
            response(400, "Error", "Something Wrong", "", "", res)
            return;
        }
        const product = await ProductModel.findOne({ where: { product: req.body.product } })
        const size = await SizeModel.findOne({ where: { size: req.body.size } })
        if (!product.dataValues && !size.dataValues) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        await size.addModel(product);
        await product.addLarge(size);
        response(200, "Ok", "Success", "", "", res)
    }
    catch (error) {
        response(500, error, "False", "", "", res)
    }
}

const relationProductCategory = async (req, res) => {
    try {
        if (!req) {
            response(400, "Error", "Something Wrong", "", "", res)
            return;
        }
        const product = await ProductModel.findOne({ where: { product: req.body.product } })
        const category = await CategoryModel.findOne({ where: { category: req.body.category } })
        if (!product.dataValues && !category.dataValues) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        await category.addProduct(product)
        await product.addTag(category)
        response(200, "Ok", "Success", "", "", res)
    }
    catch (error) {
        response(500, error, "False", "", "", res)
    }
}

// =============================================================== UPLOAD IMAGE ===================================================

const uploadImage = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const data = {
            product: req.body.product,
            image: req.file.path
        }
        const search = await ProductModel.findOne({ where: { product: data.product } })
        if (!search) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        const product = await ProductModel.update({ image: data.image }, { where: { id: search.id } })
        response(200, product, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

//  ================================================ UPDATE DATAS ===================================================================

const updateProduct = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const data = {
            product: req.body.product,
            price: req.body.price,
            category: req.body.category,
            color: req.body.color,
            size: req.body.size
        }
        const search = await ProductModel.findOne({ where: { product: data.product } })
        if (search.dataValues) {
            const update = await ProductModel.update({
                product: data.product, price: data.price, category: data.category, color: data.color, size: data.size
            }, { where: { id: search.id } })
            response(200, update, "Request Success", "", "", res)
        }
        if (!search.dataValues) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const updateImage = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const data = {
            product: req.body.product,
            image: req.file.path
        }
        const search = await ProductModel.findOne({ where: { product: data.product } })
        if (search.dataValues) {
            const filePath = search.image
            fs.unlinkSync(filePath)
            const update = await ProductModel.update({
                image: data.image
            }, { where: { id: search.id } })
            response(200, update, "Request Success", "", "", res)
        }
        if (!search.dataValues) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

// =========================================================== UPDATE STOCK ==============================================================

const updateVariantModel = async (req, res) => {
    try {
        if (!req) {
            response(400, "Error", "Something wrong", "", "", res)
            return;
        }
        const data = {
            product: req.body.product,
            color: req.body.color,
            stock: req.body.stock
        }
        const productId = await ProductModel.findOne({ where: { product: data.product } })
        const colorId = await ColorModel.findOne({ where: { color: data.color } })
        if (!productId.dataValues.id && !colorId.dataValues.id) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        const search = await VariantModel.findOne({ where: { productId: productId.dataValues.id, colorId: colorId.dataValues.id } })
        if (!search) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        const update = await VariantModel.update({ stock: data.stock }, { where: { id: search.dataValues.id } })
        response(200, update, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const updateLargeModel = async (req, res) => {
    try {
        if (!req) {
            response(400, "Error", "Something wrong", "", "", res)
            return;
        }
        const data = {
            size: req.body.size,
            product: req.body.product,
            stock: req.body.stock
        }
        const productId = await ProductModel.findOne({ where: { product: data.product } })
        const sizeId = await SizeModel.findOne({ where: { size: data.size } })
        if (!productId.dataValues.id && !sizeId.dataValues.id) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        const search = await LargeModel.findOne({ where: { productId: productId.dataValues.id, sizeId: sizeId.dataValues.id } })
        if (!search) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        const update = await LargeModel.update({ stock: data.stock }, { where: { id: search.id } })
        response(200, update, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const updateTagModel = async (req, res) => {
    try {
        if (!req) {
            response(400, "Error", "Something Wrong", "", "", res)
            return;
        }
        const data = {
            product: req.body.product,
            category: req.body.category,
            stock: req.body.stock
        }
        const productId = await ProductModel.findOne({ where: { product: data.product } })
        const categoryId = await CategoryModel.findOne({ where: { category: data.category } })
        if (!productId.dataValues && !categoryId.dataValues) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        const search = await TagModel.findOne({ where: { ProductId: productId.dataValues.id, CategoryId: categoryId.dataValues.id } })
        if (!search) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        const update = await TagModel.update({ stock: data.stock }, { where: { id: search.id } })
        response(200, update, "Request Success", "", "", res)
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

// ====================================================== DELETE DATAS ============================================================ 

const deleteProduct = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const product = req.body.product
        const search = await ProductModel.findOne({ where: { product } })
        const searchVariant = await VariantModel.findAll({ where: { ProductId: search.dataValues.id } })
        const searchTag = await TagModel.findAll({ where: { ProductId: search.dataValues.id } })
        const searchLarge = await LargeModel.findAll({ where: { ProductId: search.dataValues.id } })
        if (search.dataValues || !searchLarge || !searchTag || !searchVariant) {
            if (search.dataValues.image) {
                const filePath = search.dataValues.image
                fs.unlinkSync(filePath)
            }
            const deleteProduct = await ProductModel.destroy({ where: { id: search.dataValues.id } })
            response(200, { Status: deleteProduct, Delete_product: search.dataValues.product }, "Request Success", res)
            return;
        }
        if (search.dataValues || searchLarge || searchTag || searchVariant) {
            const deleteVariant = await VariantModel.destroy({ where: { ProductId: search.dataValues.id } })
            const deleteTag = await TagModel.destroy({ where: { ProductId: search.dataValues.id } })
            const deleteLarge = await LargeModel.destroy({ where: { ProductId: search.dataValues.id } })
            if (deleteLarge !== 0 || deleteTag !== 0 || deleteVariant !== 0) {
                if (search.dataValues.image) {
                    const filePath = search.dataValues.image
                    fs.unlinkSync(filePath)
                }
                const deleteProduct = await ProductModel.destroy({ where: { id: search.dataValues.id } })
                response(200, { Delete: { Product: { Status: deleteProduct, Delete_product: search.dataValues.product }, deleteLarge, deleteTag, deleteVariant } }, "Request Success", "", "", res)
            }
            if (!deleteVariant || !deleteLarge || !deleteTag) {
                response(400, "Request Failed", "Bad Request", "", "", res)
                return;
            }
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

const deleteSize = async (req, res) => {
    try {
        if (!req) {
            response(400, "Error", "Something wrong", "", "", res)
            return;
        }
        const size = req.body.size
        const search = await SizeModel.findOne({ where: { size } })
        if (!search) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        const searchRelation = await LargeModel.findAll({ where: { SizeId: search.dataValues.id } })
        if (!searchRelation) {
            const deleteSize = await SizeModel.destroy({ where: { id: search.dataValues.id } })
            response(200, deleteSize, "Request Success", "", "", res)
            return;
        }
        const deleteRelation = await LargeModel.destroy({ where: { SizeId: search.dataValues.id } })
        if (deleteRelation !== 0) {
            const deleteSize = await SizeModel.destroy({ where: { id: search.dataValues.id } })
            response(200, { Delete: deleteSize, deleteRelation }, "Request Success", "", "", res)
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
    }
}

const deleteColor = async (req, res) => {
    try {
        if (!req) {
            response(400, "Error", "Something wrong", "", "", res)
            return;
        }
        const color = req.body.color
        const search = await ColorModel.findOne({ where: { color } })
        if (!search) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        const searchRelation = await VariantModel.findAll({ where: { ColorId: search.dataValues.id } })
        if (!searchRelation) {
            const deleteColor = await ColorModel.destroy({ where: { id: search.dataValues.id } })
            response(200, deleteColor, "Request Success", "", "", res)
            return;
        }
        const deleteRelation = await VariantModel.destroy({ where: { ColorId: search.dataValues.id } })
        if (deleteRelation !== 0) {
            const deleteColor = await ColorModel.destroy({ where: { id: search.dataValues.id } })
            response(200, { Delete: deleteColor, deleteRelation }, "Request Success", "", "", res)
        }
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}

const deleteCategory = async (req, res) => {
    try {
        if (!req) {
            response(400, "Error", "Something wrong", "", "", res)
            return;
        }
        const category = req.body.category
        const search = await CategoryModel.findOne({ where: { category } })
        if (!search) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        const searchRelation = await TagModel.findAll({ where: { CategoryId: search.dataValues.id } })
        if (!searchRelation) {
            const deleteCategory = await CategoryModel.destroy({ where: { id: search.dataValues.id } })
            response(200, deleteCategory, "Request Success", "", "", res)
            return; R
        }
        const deleteRelation = await TagModel.destroy({ where: { CategoryId: search.dataValues.id } })
        if (deleteRelation !== 0) {
            const deleteCategory = await CategoryModel.destroy({ where: { id: search.dataValues.id } })
            response(200, { Delete: deleteCategory, deleteRelation }, "Request Success", "", "", res)
        }
    }
    catch (error) {
        response(500, error, "Server Error", res)
    }
}




module.exports = {
    // ===== GET DATA =====
    getAllProduct,
    getAllColor,
    getAllCategory,
    getAllSize,
    getOneProduct,
    //  ===== CREATE DATA =====
    createProduct,
    createColor,
    createSize,
    createCategory,
    // ===== UPLOAD DATA =====
    uploadImage,
    // ===== UPDATE DATA =====
    updateProduct,
    updateImage,
    // ====== DELETE DATA ======
    deleteProduct,
    deleteSize,
    deleteCategory,
    deleteColor,
    // ====== CREATE RELATION =====
    relationProductColor,
    relationProductSize,
    relationProductCategory,
    // ===== UPDATE RELATION =====
    updateVariantModel,
    updateLargeModel,
    updateTagModel,
    // ===== DELETE RELATION =====
    // ===== UPLOAD IMAGE ======
    upload
}