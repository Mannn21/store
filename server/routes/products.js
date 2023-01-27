const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.post('/create', productController.upload,  productController.createProductImage)

module.exports = router