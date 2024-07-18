const express = require("express")
const multer = require('multer')
const router = express.Router();
// const storageMulter = require("../../helpers/storageMulter")
const upload = multer()
const controller = require("../../controllers/admin/product.controller")
const validate = require("../../validate/admin/product.validate")

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti)

router.delete('/delete/:id', controller.DeleteItem);

router.get('/create', controller.create); // lay ra trang tao moi san pham

router.post(
    '/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);

router.get('/edit/:id', controller.edit);

router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch
);

router.get('/detail/:id', controller.detail);

module.exports = router;