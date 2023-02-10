const CartModel = require('../models/cart/cart.js')
const UserModel = require('../models/user/usersModel.js')
const ProductModel = require('../models/product/productsModel.js')
const VariantModel = require('../models/product/variantProduct.js')
const LargeModel = require('../models/product/largeProduct.js')
const ColorModel = require('../models/product/colorsModel.js')
const SizeModel = require('../models/product/sizesModel.js')
const response = require('../utils/response.js')

const getAllCarts = async (req, res) => {
    const id = req.body.id
    try {
        const search = await CartModel.findAll({where: {userId: id}})
        response(200, search, "Request Success", "", "", res)
        return;
    }
    catch(error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const createCart = async (req, res) => {
    const data = {
        product: req.body.product,
        userId: req.body.userId,
        color: req.body.color,
        size: req.body.size,
        many: req.body.many
    }
    const searchUser = await UserModel.findOne({where: {id: data.userId}})
    const searchProduct = await ProductModel.findOne({where: {product: data.product}})
    const searchColor = await ColorModel.findOne({where: {color: data.color}})
    const searchVariant = await VariantModel.findOne({where: {colorId: searchColor.dataValues.id, productId: searchProduct.dataValues.id}})
    const searchSize = await SizeModel.findOne({where: {size: data.size}})
    const searchLarge = await LargeModel.findOne({where: {sizeId: searchSize.dataValues.id, productId: searchProduct.dataValues.id}})
    try {
        if(searchUser && searchProduct && searchLarge && searchVariant) {
            if(searchVariant.dataValues.stock === null && searchVariant.dataValues.stock === 0 && searchLarge.dataValues.stock === null && searchLarge.dataValues.stock === 0 ) {
                // response(400, "Bad Request", "Items not available", "", "", res)
                // return;
            }
            if(searchVariant.dataValues.stock !== null && searchVariant.dataValues.stock !== 0 && searchLarge.dataValues.stock !== null && searchLarge.dataValues.stock !== 0) {
                if(data.many > searchLarge.dataValues.stock  || data.many > searchVariant.dataValues.stock ) {
                    response(400, "Bad Request", "Items not available", "", "", res)
                    return;
                }
                if(data.many <= searchLarge.dataValues.stock &&  data.many <= searchVariant.dataValues.stock) {
                    const createCart = await CartModel.create({
                        productId: searchProduct.dataValues.id,
                        userId: data.userId,
                        variantId: searchVariant.dataValues.id,
                        largeId: searchLarge.dataValues.id,
                        many: data.many
                    })
                    response(200, {product: searchProduct.dataValues.product, many: data.many, createCart}, "Create Cart Success", "", "", res)
                    return;
                }
            }
        }
        if(!searchLarge || !searchProduct || !searchUser || !searchVariant) {
            response(400, "Bad Request", "Something Wrong", "", "", res)
            return;
        }
    }
    catch(error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const addItem = async (req, res) => {
    const data = {
        productId: req.body.productId,
        id: req.body.id,
        variantId: req.body.variantId,
        largeId: req.body.largeId,
        many: 1
    }
    const searchCart = await CartModel.findOne({where: {productId: data.productId, userId: data.id, variantId: data.variantId, largeId: data.largeId}})
    const searchProduct = await ProductModel.findOne({where: {id: data.productId}})
    const searchVariant = await VariantModel.findOne({where: {id: data.variantId}})
    const searchLarge = await LargeModel.findOne({where: {id: data.largeId}})
    try {
        if(searchCart) {
            if(searchCart.dataValues.many === searchVariant.dataValues.stock || searchCart.dataValues.many > searchLarge.dataValues.stock ) {
                response(400, "Bad Request", "Items not available", "", "", res)
                return;
            }
            if(searchCart.dataValues.many <= searchLarge.dataValues.stock && searchCart.dataValues.many <= searchVariant.dataValues.stock) {
                const updateCart = await CartModel.update({many: searchCart.dataValues.many + data.many}, {where: {id: searchCart.dataValues.id}})
                response(200, {updateCart, many_items: data.many}, "Add Items Success", "", "", res)
                return;
            }
        }
        if(!searchCart) {
            response(400, "Bad Request", "Something Wrong", "", "", res)
            return;
        }
    }
    catch(error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const reduceItem = async (req, res) => {
    const data = {
        productId: req.body.productId,
        id: req.body.id,
        variantId: req.body.variantId,
        largeId: req.body.largeId,
        many: 1
    }
    const searchCart = await CartModel.findOne({where: {productId: data.productId, userId: data.id, variantId: data.variantId, largeId: data.largeId}})
    try {
        if(searchCart) {
            if(searchCart.dataValues.many <= 1) {
                const deleteCart = await CartModel.destroy({where: {id: searchCart.dataValues.id}})
                response(200, deleteCart, "Delete Items Success", "", "", res)
                return;
            }
            if(searchCart.dataValues.many > 1 ) {
                const updateCart = await CartModel.update({many: searchCart.dataValues.many - data.many}, {where: {id: searchCart.dataValues.id}})
                response(200, {updateCart, many_items: data.many}, "Reduce Items Success", "", "", res)
                return;
            }
        }
        if(!searchCart) {
            response(400, "Bad Request", "Something Wrong", "", "", res)
            return;
        }
    }
    catch(error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const deleteCart = async (req, res) => {
    const data = {
        productId: req.body.productId,
        id: req.body.id,
        variantId: req.body.variantId,
        largeId: req.body.largeId,
    }
    const searchCart = await CartModel.findOne({where: {productId: data.productId, userId: data.id, variantId: data.variantId, largeId: data.largeId}})
    try {
        if(searchCart) {
            const deleteCart = await CartModel.destroy({where: {id: searchCart.dataValues.id}})
            response(200, deleteCart, "Delete Item Success", "", "", res)
            return;
        }
        if(!searchCart) {
            response(400, "Bad Request", "Something Wrong", "", "", res)
            return;
        }
    }
    catch(error) {
        response(500, error, "Server Error", "", "", res)
        return;
    }
}

const checkOut = async (req, res) => {

}

module.exports = {
    getAllCarts,
    createCart,
    addItem,
    reduceItem,
    deleteCart,
    checkOut
}
