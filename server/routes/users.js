const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const refreshToken = require('../controllers/refreshToken')
const userController = require('../controllers/userController')
const cartController = require('../controllers/cartController')

// ====================================================== USERS =========================================================

// ----------------------------------------------------------- GET DATAS ---------------------------------------------------------
router.get('/', verifyToken, userController.getAllUser)
router.get('/refresh', refreshToken)
router.get("/:id", verifyToken, userController.getUserByUnique)

// ----------------------------------------------------------- CREATE DATAS ------------------------------------------------------
router.post('/', userController.createUser)

// --------------------------------------------------------- UPDATE DATAS ---------------------------------------------------------
router.put('/', verifyToken, userController.updateUser)
router.post('/image', verifyToken, userController.upload, userController.updateImage)

// ------------------------------------------------------------ DELETE DATAS -----------------------------------------------------
router.delete('/', verifyToken, userController.deleteUser)
router.delete('/logout', userController.logout)

// ---------------------------------------------------------- LOGIN ---------------------------------------------------
router.post('/login', userController.login)


// ============================================================= CARTS ====================================================

// -------------------------------------------------------- CREATE CART ----------------------------------------------
router.post('/cart', verifyToken, cartController.createCart)

// ------------------------------------------------------ GET ALL CARTS -----------------------------------------------

router.post('/cart/id', verifyToken, cartController.getAllCarts)

// --------------------------------------------------------- UPDATE CART ----------------------------------------------
router.put('/cart/add', verifyToken, cartController.addItem)
router.put('/cart/remove', verifyToken, cartController.reduceItem)

// --------------------------------------------------------- DELETE CART ---------------------------------------------
router.delete('/cart', verifyToken, cartController.deleteCart)

module.exports = router