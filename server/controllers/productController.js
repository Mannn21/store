const ProductModel = require('../models/product/productsModel')
const VariantModel = require('../models/product/variantProduct')
const LargeModel = require('../models/product/largeProduct')
const TagModel = require('../models/product/tagProduct')
const CategoryModel = require('../models/product/categoriesModel')
const SizeModel = require('../models/product/sizesModel')
const ColorModel = require('../models/product/colorsModel')
const ItemModel = require('../models/product/itemsModel')
const response = require('../utils/response')
const path = require('path')
const fs = require('fs')
const multer = require('multer')



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
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
    const limit = req.query.limit || 10;
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
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const getAllColor = async (req, res) => {
    try{
        const color = await ColorModel.findAll()
        response(200, {Color: color}, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "","", res)
        return;
    }
}

const getAllCategory = async (req, res) => {
    try{
        const category = await CategoryModel.findAll()
        response(200, {Category: category}, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "","", res)
        return;
    }
}

const getAllSize = async (req, res) => {
    try{
        const size = await SizeModel.findAll()
        response(200, {Size: size}, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "","", res)
        return;
    }
}

const getColorProduct = async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const color = await ColorModel.findAll({
        limit,
        offset,
        include: [
            {
                model: ProductModel,
                as: "product"
            }
        ]
    })
    try {
        response(200, color, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const getCategoryProduct = async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const category = await CategoryModel.findAll({
        limit,
        offset,
        include: [
            {
                model: ProductModel,
                as: "product"
            }
        ]
    })
    try {
        response(200, category, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const getSizeProduct = async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const size = await SizeModel.findAll({
        limit,
        offset,
        include: [
            {
                model: ProductModel,
                as: "model"
            }
        ]
    })
    try {
        response(200, size, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const getOneProduct = async (req, res) => {
    try {
        if (!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const product = req.params.product
        const search = await ProductModel.findOne({ where: {product} })
        if (search) {
            response(200, search, "Request Success", "", "", res)
            return;
        }
        if (!search) {
            response(400, "Bad Request", "Request Data Failed", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const getAllItem = async (req, res) => {
    try {
        const search = await ItemModel.findAll()
        if(!search) {
            response(400, "Bad Request", "Request Data Failed", "", "", res)
            return;
        }
        response(200, search, "Request Success", "", "", res)
        return; 
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

// ============================================================== CREATE PRODUCT ===================================================

const createProduct = async (req, res) => {
    try {
        if (!req) {
            response(400, "error", "Something wrong", "", "", res)
            return;
        }
        const product = req.body.product
        const getProduct = await ProductModel.findOne({where: {product}})
        if(getProduct === null) {
            const createProduct = await ProductModel.create({
                product
            })
            response(200, createProduct, "Request Success", "", "", res)
            return;
        }
        if (getProduct.dataValues) {
            response(404, "Request Data Failed", "Product is already registered", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const createColor = async (req, res) => {
    const color =  req.body.color
    try {
        if (!req) {
            response(400, "error", "Something Wrong", "", "", res)
            return;
        }
        const search = await ColorModel.findOne({where: {color}})
        if(!search) {
            const createColor = await ColorModel.create({ color: req.body.color })
            response(200, createColor, "Request Success", "", "", res)
            return;
        }
        if (search) {
            response(404, "Request Failed", "Color is Unique", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const createSize = async (req, res) => {
    const size =  req.body.size
    try {
        if (!req) {
            response(400, "error", "Something Wrong", "", "", res)
            return;
        }
        const search = await SizeModel.findOne({where: {size}})
        if(!search) {
            const createSize = await SizeModel.create({ size: req.body.size })
            response(200, createSize, "Request Success", "", "", res)
            return;
        }
        if (search) {
            response(404, "Request Failed", "Size is Unique", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const createCategory = async (req, res) => {
    const category =  req.body.category
    try {
        if (!req) {
            response(400, "error", "Something Wrong", "", "", res)
            return;
        }
        const search = await CategoryModel.findOne({where: {category}})
        if(!search) {
            const createCategory = await CategoryModel.create({ category: req.body.category })
            response(200, createCategory, "Request Success", "", "", res)
            return;
        }
        if (search) {
            response(404, "Request Failed", "Category is Unique", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
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
        return;
    }
    catch (error) {
        response(500, error, "False", "", "", res)
        return;
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
        return;
    }
    catch (error) {
        response(500, error, "False", "", "", res)
        return;
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
        return;
    }
    catch (error) {
        response(500, error, "False", "", "", res)
        return;
    }
}

const createItem = async (req, res) => {
    try {
        if(!req) {
            response(400, "Error", "Something Wrong", "", "", res)
            return;
        }
        const data = {
            product: req.body.product,
            color: req.body.color,
            size: req.body.size,
            stock: req.body.stock,
            price: req.body.price
        }
        const searchProduct = await ProductModel.findOne({where: {product: data.product}})
        const searchColor = await ColorModel.findOne({where: {color: data.color}})
        const searchSize = await SizeModel.findOne({where: {size: data.size}})
        if(!searchColor || !searchProduct || !searchSize) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        if(searchColor && searchProduct && searchSize) {
            const searchVariant = await VariantModel.findOne({where: {productId: searchProduct.dataValues.id, colorId: searchColor.dataValues.id}})
            const searchLarge = await LargeModel.findOne({where: {productId: searchProduct.dataValues.id, sizeId: searchSize.dataValues.id}})
            if(searchLarge && searchVariant) {
                const search = await ItemModel.findOne({where: {variantId: searchVariant.dataValues.id, largeId: searchLarge.dataValues.id, product: data.product}})
                if(!search) {
                    const createItem = await ItemModel.create({
                        variantId: searchVariant.dataValues.id,
                        largeId: searchLarge.dataValues.id,
                        color: data.color,
                        product: data.product,
                        size: data.size,
                        stock: data.stock,
                        price: data.price
                    })
                    response(200, createItem, "Create Item Success", "", "", res)
                    return;
                }
                if(search) {
                    response(404, "Data is Registered", "Bad Request", "", "", res)
                    return;
                }
            }
            if(!searchLarge || !searchVariant) {
                response(404, "Data Not Enough", "Bad Request", "", "", res)
                return;
            }
        }
    }
    catch (error) {
        response(500, error, "False", "", "", res)
        return;
    }
}

// ================================================================ UPLOAD RELATION ========================================

const updateVariant = async (req, res) => {
    try {
        if(!req) {
            response(400, "Error", "Something Wrong", "", "", res)
            return;
        }
        const data = {
            color: req.body.color,
            product: req.body.product
        }
        const searchProduct = await ProductModel.findOne({where: {product: data.product}})
        const searchColor = await ColorModel.findOne({where: {color: data.color}})
        if(!searchColor || !searchProduct) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        if(searchColor && searchProduct) {
            const search = await VariantModel.findOne({where: {ProductId: searchProduct.dataValues.id, ColorId: searchColor.dataValues.id}})
            if(!search) {
                response(404, "Data Not Enough", "Bad Request", "", "", res)
                return;
            }
            if(search) {
                const updateVariant = await VariantModel.update({color: data.color, product: data.product}, {where: {id: search.dataValues.id}})
                response(200, updateVariant, "Request Success", "", "", res)
                return;
            }
        }
    }
    catch (error) {
        response(500, error, "False", "", "", res)
        return;
    }
}

const updateLarge = async (req, res) => {
    try {
        if(!req) {
            response(400, "Error", "Something Wrong", "", "", res)
            return;
        }
        const data = {
            size: req.body.size,
            product: req.body.product
        }
        const searchProduct = await ProductModel.findOne({where: {product: data.product}})
        const searchSize = await SizeModel.findOne({where: {size: data.size}})
        if(!searchSize || !searchProduct) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        if(searchSize && searchProduct) {
            const search = await LargeModel.findOne({where: {ProductId: searchProduct.dataValues.id, SizeId: searchSize.dataValues.id}})
            if(!search) {
                response(404, "Data Not Enough", "Bad Request", "", "", res)
                return;
            }
            if(search) {
                const updateLarge = await LargeModel.update({size: data.size, product: data.product}, {where: {id: search.dataValues.id}})
                response(200, updateLarge, "Request Success", "", "", res)
                return;
            }
        }
    }
    catch (error) {
        response(500, error, "False", "", "", res)
        return;
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
            id: req.body.id,
            image: req.file.path
        }
        const search = await ItemModel.findOne({ where: { id: data.id } })
        if (!search) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        const product = await ItemModel.update({ image: data.image }, { where: { id: search.id } })
        response(200, product, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
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
            newProduct: req.body.newProduct
        }
        const search = await ProductModel.findOne({ where: { product: data.product } })
        const searchItem = await ItemModel.findAll({where: {product: data.product}})
        if (search.dataValues) {
            if(!searchItem) {
                const update = await ProductModel.update({
                    product: data.newProduct
                }, { where: { id: search.dataValues.id } })
                response(200, update, "Request Success", "", "", res)
                return;
            }
            if(searchItem) {
                const update = await ProductModel.update({
                    product: data.newProduct
                }, { where: { id: search.dataValues.id } })
                const updateItem = await ItemModel.update({product: data.newProduct}, {where: {product: data.product}})
                response(200, {update, updateItem}, "Request Success", "", "", res)
                return;

            }
        }
        if (!search.dataValues) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
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
            id: req.body.id,
            image: req.file.path
        }
        const search = await ItemModel.findOne({ where: { id: data.id } })
        if (search.dataValues) {
            const filePath = search.image
            fs.unlinkSync(filePath)
            const update = await ItemModel.update({
                image: data.image
            }, { where: { id: search.id } })
            response(200, update, "Request Success", "", "", res)
            return;
        }
        if (!search.dataValues) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const updateColor = async (req, res) => {
    try {
        if(!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const data = {
            color: req.body.color,
            newColor: req.body.newColor
        }
        const search = await ColorModel.findOne( {where: {color: data.color}} )
        const searchItem = await ItemModel.findAll({where: {color: data.color}})
        if(!search || !searchItem) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        const update = await ColorModel.update({color: data.newColor}, {where: {id: search.dataValues.id}})
        const updateItem = await ItemModel.update({color: data.newColor}, {where: {color: data.color}})
        response(200, {Update: {update, updateItem}, Color: data.newColor}, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const updateCategory = async (req, res) => {
    try {
        if(!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const data = {
            category: req.body.category,
            newCategory: req.body.newCategory
        }
        const search = await CategoryModel.findOne( {where: {category: data.category}} )
        if(!search) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        const update = await CategoryModel.update({category: data.newCategory}, {where: {id: search.dataValues.id}})
        response(200, {Update: update, Category: data.newCategory}, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const updateSize = async (req, res) => {
    try {
        if(!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const data = {
            size: req.body.size,
            newSize: req.body.newSize
        }
        const search = await SizeModel.findOne( {where: {size: data.size}} )
        const searchItem = await ItemModel.findAll({where: {size: data.size}})
        if(!search || !searchItem) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
        const update = await SizeModel.update({size: data.newSize}, {where: {id: search.dataValues.id}})
        const updateItem = await ItemModel.update({size: data.newSize}, {where: {size: data.size}})
        response(200, {Update: {update, updateItem}, Size: data.newSize}, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

// =========================================================== UPDATE STOCK ==============================================================

const updateItem = async (req, res) => {
    try {
        if(!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const data = {
            id: req.body.id,
            stock: req.body.id
        }
        const search = await ItemModel.findOne({where: {id: data.id}})
        if(search) {
            const updateItem = await ItemModel.update({stock: data.stock}, {where: {id: search.dataValues.id}})
            if(updateItem) {
                response(200, updateItem, "Request Success", "", "", res)
                return
            }
            if(!updateItem) {
                response(404, "Request Failed", "Bad Request", "", "", res)
                return;
            }
        }
        if(!search) {
            response(404, "Data not Enough", "Bad Request", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
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
        const searchItem = await ItemModel.findAll({where: {variantId: searchVariant.dataValues.id, largeId: searchLarge.dataValues.id}})
        if (search.dataValues || !searchLarge || !searchTag || !searchVariant || !searchItem) {
            if (search.dataValues.image) {
                const filePath = search.dataValues.image
                fs.unlinkSync(filePath)
            }  
            const deleteProduct = await ProductModel.destroy({ where: { id: search.dataValues.id } })
            response(200, { Status: deleteProduct, Delete_product: search.dataValues.product }, "Request Success", res)
            return;
        }
        if (search.dataValues || searchLarge || searchTag || searchVariant || searchItem) {
            const deleteVariant = await VariantModel.destroy({ where: { ProductId: search.dataValues.id } })
            const deleteTag = await TagModel.destroy({ where: { ProductId: search.dataValues.id } })
            const deleteLarge = await LargeModel.destroy({ where: { ProductId: search.dataValues.id } })
            const deleteItem = await ItemModel.destroy({where: {variantId: searchVariant.dataValues.id, largeId: searchLarge.dataValues.id}})
            if (deleteLarge !== 0 || deleteTag !== 0 || deleteVariant !== 0 || deleteItem !== 0) {
                if (search.dataValues.image) {
                    const filePath = search.dataValues.image
                    fs.unlinkSync(filePath)
                }
                const deleteProduct = await ProductModel.destroy({ where: { id: search.dataValues.id } })
                response(200, { Delete: { Product: { Status: deleteProduct, Delete_product: search.dataValues.product }, deleteLarge, deleteTag, deleteVariant } }, "Request Success", "", "", res)
                return;
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
        return;
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
        const searchItem = await ItemModel.findAll({ where: { largeId: searchRelation.dataValues.id } })
        if (!searchRelation || !searchItem) {
            const deleteSize = await SizeModel.destroy({ where: { id: search.dataValues.id } })
            response(200, deleteSize, "Request Success", "", "", res)
            return;
        }
        if(!searchItem) {
            const deleteRelation = await LargeModel.destroy({ where: { SizeId: search.dataValues.id } })
            if (deleteRelation !== 0) {
                const deleteSize = await SizeModel.destroy({ where: { id: search.dataValues.id } })
                response(200, { Delete: deleteSize, deleteRelation }, "Request Success", "", "", res)
                return;
            }
        }
        if(searchItem) {
            const deleteItem = await ItemModel.destroy({ where: { largeId: searchRelation.dataValues.id } })
            const deleteRelation = await LargeModel.destroy({ where: { SizeId: search.dataValues.id } })
            const deleteSize = await SizeModel.destroy({ where: { id: search.dataValues.id } })
            response(200, { Delete: deleteSize, deleteRelation, deleteItem }, "Request Success", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
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
        const searchItem = await ItemModel.findAll({ where: { variantId: searchRelation.dataValues.id } })
        if (!searchRelation || ! searchItem) {
            const deleteColor = await ColorModel.destroy({ where: { id: search.dataValues.id } })
            response(200, deleteColor, "Request Success", "", "", res)
            return;
        }
        if(!searchItem) {
            const deleteRelation = await VariantModel.destroy({ where: { ColorId: search.dataValues.id } })
            if (deleteRelation !== 0) {
                const deleteColor = await ColorModel.destroy({ where: { id: search.dataValues.id } })
                response(200, { Delete: deleteColor, deleteRelation }, "Request Success", "", "", res)
                return;
            }
        }
        if(searchItem) {
            const deleteItem = await ItemModel.destroy({ where: { variantId: searchRelation.dataValues.id } })
            const deleteRelation = await VariantModel.destroy({ where: { ColorId: search.dataValues.id } })
            const deleteColor = await ColorModel.destroy({ where: { id: search.dataValues.id } })
            response(200, { Delete: deleteColor, deleteRelation, deleteItem }, "Request Success", "", "", res)
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", res)
        return;
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
            return;
        }
    }
    catch (error) {
        response(500, error, "Server Error", res)
        return;
    }
}

const deleteRelationColor = async (req, res) => {
    try {
        const data = {
            color: req.body.color,
            product: req.body.product
        }
        const searchProduct = await ProductModel.findOne( {where: {product: data.product}} )
        const searchColor = await ColorModel.findOne( {where: {color: data.color}} )
        if(!searchColor || ! searchProduct) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        const search = await VariantModel.findOne( {where: {ProductId: searchProduct.dataValues.id, ColorId: searchColor.dataValues.id}} )
        const searchItem = await ItemModel.findAll({where: {variantId: search.dataValues.id}})
        if(!search) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        if(!searchItem) {
            const deleteRelation = await VariantModel.destroy( {where: {id: search.dataValues.id}} )
            response(200, deleteRelation, "Request Success", "", "", res)
            return;
        }
        if(searchItem) {
            const deleteItem = await ItemModel.destroy({where: {variantId: search.dataValues.id}})
            const deleteRelation = await VariantModel.destroy( {where: {id: search.dataValues.id}} )
            response(200, {deleteRelation, deleteItem}, "Request Success", "", "", res)
            return;

        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const deleteRelationCategory = async (req, res) => {
    try {
        const data = {
            category: req.body.category,
            product: req.body.product
        }
        const searchProduct = await ProductModel.findOne( {where: {product: data.product}} )
        const searchCategory = await CategoryModel.findOne( {where: {category: data.category}} )
        if(!searchCategory || ! searchProduct) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        const search = await TagModel.findOne( {where: {ProductId: searchProduct.dataValues.id, CategoryId: searchCategory.dataValues.id}} )
        if(!search) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        const deleteRelation = await TagModel.destroy( {where: {id: search.dataValues.id}} )
        response(200, deleteRelation, "Request Success", "", "", res)
        return;
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const deleteRelationSize = async (req, res) => {
    try {
        const data = {
            size: req.body.size,
            product: req.body.product
        }
        const searchProduct = await ProductModel.findOne( {where: {product: data.product}} )
        const searchSize = await SizeModel.findOne( {where: {size: data.size}} )
        if(!searchSize || ! searchProduct) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        const search = await LargeModel.findOne( {where: {ProductId: searchProduct.dataValues.id, SizeId: searchSize.dataValues.id}} )
        const searchItem = await ItemModel.findAll({where: {largeId: search.dataValues.id}})
        if(!search) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        if(search) {
            if(!searchItem) {
                const deleteRelation = await LargeModel.destroy( {where: {id: search.dataValues.id}} )
                response(200, deleteRelation, "Request Success", "", "", res)
                return;
            }
            if(searchItem) {
                const deleteItem = await ItemModel.destroy({where: {largeId: search.dataValues.id}})
                const deleteRelation = await LargeModel.destroy( {where: {id: search.dataValues.id}} )
                response(200, {deleteRelation, deleteItem}, "Request Success", "", "", res)
                return;
            }
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const deleteItem = async (req, res) => {
    try{
        if(!req) {
            response(400, error, "Something wrong", "", "", res)
            return;
        }
        const data = {
            product: req.body.product,
            color: req.body.color,
            size: req.body.size
        }
        const searchProduct = await ProductModel.findOne({where: {product: data.product}})
        const searchColor = await ColorModel.findOne({where: {color: data.color}})
        const searchSize = await SizeModel.findOne({where: {size: data.size}})
        if(!searchProduct || !searchColor || !searchSize) {
            response(404, "Data Not Enough", "Bad Request", "", "", res)
            return;
        }
        if(searchProduct && searchColor && searchSize) {
            const searchVariant = await VariantModel.findOne({where: {ProductId: searchProduct.dataValues.id, ColorId: searchColor.dataValues.id}})
            const searchLarge = await LargeModel.findOne({where: {ProductId: searchProduct.dataValues.id, SizeId: searchSize.dataValues.id}})
            if(!searchVariant || !searchLarge) {
                response(404, "Data Not Enough", "Bad Request", "", "", res)
                return;
            }
            if(searchVariant && searchLarge) {
                const deleteItem = await ItemModel.destroy({where: {productId: searchProduct.dataValues.id, variantId: searchVariant.dataValues.id, largeId: searchLarge.dataValues.id}})
                response(200, deleteItem, "Request Success", "", "", res)
                return;
            }
        }
    }
    catch (error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

module.exports = {
    // ===== GET DATA =====
    getAllProduct,
    getAllColor,
    getAllCategory,
    getAllSize,
    getColorProduct,
    getCategoryProduct,
    getSizeProduct,
    getOneProduct,
    getAllItem,
    //  ===== CREATE DATA =====
    createProduct,
    createColor,
    createSize,
    createCategory,
    createItem,
    // ===== UPLOAD DATA =====
    uploadImage,
    // ===== UPDATE DATA =====
    updateProduct,
    updateImage,
    updateCategory,
    updateColor,
    updateSize,
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
    updateItem,
    updateVariant,
    updateLarge,
    // ===== DELETE RELATION =====
    deleteRelationCategory,
    deleteRelationColor,
    deleteRelationSize,
    deleteItem,
    // ===== UPLOAD IMAGE ======
    upload
}