const ProductModel = require('../models/productsModel')
const response = require('../utils/response')
const path = require('path')
const fs = require('fs')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extName = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extName) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

const createProduct = async (req, res) => {
    try{
        if(!req) {
        response(400, error, "Something wrong", res)
        return;
        }
        const data = {
            image: req.file.path,
            seriProduct: req.body.seriProduct,
            product: req.body.product,
            price: req.body.price,
            category: req.body.category,
            color: req.body.color,
            size: req.body.size,
        }
        const product = await ProductModel.create(data)
        console.log(product)
        // response(200, product, "Request Success", res)
    }
    catch(error) {
        response(400, error, "Something wrong", res)
    }
}




module.exports = {
    createProduct,
    upload
}



// const createImage = async (req, res) => {
//     try {
//         if (!req.file) {
//             res.status(400).send('No file uploaded.');
//             return;
//         }
//         const file = req.file;
//         const fileName = file.filename;
//         const filePath = `images/${fileName}`;

//         const fileUpload = bucket.file(filePath);
//         const stream = fileUpload.createWriteStream({
//             metadata: {
//                 contentType: file.mimetype
//             }
//         });

//         stream.on('error', (err) => {
//             res.status(500).send(err);
//         });

//         stream.on('finish', async () => {
//             await fileUpload.makePublic();
//             const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileUpload.name)}?alt=media`;
//             res.status(200).send(url);
//         });
//         stream.end(file.buffer);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };


