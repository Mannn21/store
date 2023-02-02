const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getAllUser)

router.post('/create', userController.createUser)
router.post('/update', userController.updateUser)
router.post('/upload', userController.upload, userController.uploadImage)

module.exports = router