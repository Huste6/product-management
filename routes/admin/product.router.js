const express = require("express")
const multer = require('multer')
const router = express.Router();
const storageMulter = require("../../helpers/storageMulter")
const upload = multer({ storage: storageMulter() })
const controller = require("../../controllers/admin/product.controller")
const validate = require("../../validate/admin/product.validate")

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti)

router.delete('/delete/:id', controller.DeleteItem);

router.get('/create', controller.create); // lay ra trang tao moi san pham

router.post(
    '/create',
    upload.single('thumbnail'),
    validate.createPost,
    controller.createPost
);

router.get('/edit/:id',controller.edit);

router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch
);

module.exports = router;