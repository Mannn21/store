const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getAllProduct)

router.post('/product', productController.getOneProduct)
router.post('/create',  productController.createProduct)
router.post('/upload',  productController.upload, productController.uploadImage)
router.post('/updateProduct', productController.updateProduct)
router.post('/updateImage',  productController.upload, productController.updateImage)
router.post('/delete', productController.deleteProduct)


module.exports = router