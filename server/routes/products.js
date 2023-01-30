const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getAllProduct)

router.post('/product', productController.getOneProduct)
router.post('/create',  productController.createProduct)
// router.post('/createCategory',  productController.createCategory)
router.post('/createColor',  productController.createColor)
router.post('/createSize',  productController.createSize)
router.post('/relationColor', productController.relationProductColor)
router.post('/relationSize', productController.relationProductSize)
router.post('/upload',  productController.upload, productController.uploadImage)
router.post('/updateProduct', productController.updateProduct)
router.post('/updateImage',  productController.upload, productController.updateImage)
router.post('/updateVariant', productController.updateVariantModel)
router.post('/updateLarge', productController.updateLargeModel)
router.post('/delete', productController.deleteProduct)


module.exports = router