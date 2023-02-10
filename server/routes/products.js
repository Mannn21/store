const express = require('express')
const router = express.Router()
const verifyRole = require('../middleware/verifyRole')
const productController = require('../controllers/productController')

// ======================================= GET DATAS ========================================================
router.get('/', productController.getAllProduct)
router.get('/color', productController.getAllColor)
router.get('/category', productController.getAllCategory)
router.get('/size', productController.getAllSize)
router.get('/variant', productController.getColorProduct)
router.get('/tag', productController.getCategoryProduct)
router.get('/large', productController.getSizeProduct)
router.get('/item', productController.getAllItem)
router.get('/:product', productController.getOneProduct)

// ========================================== CREATE DATAS ===================================================

router.post('/', verifyRole, productController.createProduct)
router.post('/category', verifyRole, productController.createCategory)
router.post('/color', verifyRole, productController.createColor)
router.post('/size', verifyRole, productController.createSize)

// ================================================= CREATE RELATION ==================================================

router.post('/variant', verifyRole, productController.relationProductColor)
router.post('/large', verifyRole, productController.relationProductSize)
router.post('/tag', verifyRole, productController.relationProductCategory)
router.post('/item', verifyRole, productController.createItem)

// ==================================================== UPLOAD DATAS =======================================================

router.post('/image', verifyRole, productController.upload, productController.uploadImage)

// =================================================================== UPDATE DATAS ==============================================

router.put('/', verifyRole, productController.updateProduct)
router.put('/image', verifyRole, productController.upload, productController.updateImage)
router.put('/color', verifyRole, productController.updateColor)
router.put('/category', verifyRole,  productController.updateCategory)
router.put('/size', verifyRole, productController.updateSize)
router.put('/item', verifyRole, productController.updateItem)
router.put('/variant', verifyRole, productController.updateVariant)
router.put('/large', verifyRole, productController.updateLarge)

// ======================================================================= DELETE DATAS ================================================

router.delete('/', verifyRole, productController.deleteProduct)
router.delete('/size', verifyRole, productController.deleteSize)
router.delete('/color', verifyRole, productController.deleteColor)
router.delete('/category', verifyRole, productController.deleteCategory)

// ==================================================================== DELETE RELATIONS ========================================

router.delete('/variant', verifyRole, productController.deleteRelationColor)
router.delete('/tag', verifyRole, productController.deleteRelationCategory)
router.delete('/large', verifyRole, productController.deleteRelationSize)
router.delete('/item', verifyRole, productController.deleteItem)

module.exports = router