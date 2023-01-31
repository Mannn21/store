const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

// ======================================= GET DATAS ========================================================
router.get('/', productController.getAllProduct)
router.post('/product', productController.getOneProduct)

// ========================================== CREATE DATAS ===================================================

router.post('/create',  productController.createProduct)
router.post('/createCategory',  productController.createCategory)
router.post('/createColor',  productController.createColor)
router.post('/createSize',  productController.createSize)

// ================================================= CREATE RELATION ==================================================

router.post('/relationColor', productController.relationProductColor)
router.post('/relationSize', productController.relationProductSize)
router.post('/relationCategory', productController.relationProductCategory)

// ==================================================== UPLOAD DATAS =======================================================

router.post('/upload',  productController.upload, productController.uploadImage)

// =================================================================== UPDATE DATAS ==============================================

router.post('/updateProduct', productController.updateProduct)
router.post('/updateImage',  productController.upload, productController.updateImage)

// ==================================================================== UPDATE RELATION =============================================

router.post('/updateVariant', productController.updateVariantModel)
router.post('/updateLarge', productController.updateLargeModel)
router.post('/updateTag', productController.updateTagModel)

// ======================================================================= DELETE DATAS ================================================

router.post('/delete', productController.deleteProduct)
router.post('/deleteSize', productController.deleteSize)
router.post('/deleteColor', productController.deleteColor)
router.post('/deleteCategory', productController.deleteCategory)

module.exports = router