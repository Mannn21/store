const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.post('/create', productController.upload,  productController.createProduct)

module.exports = router