const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/product-category.controller");
const multer = require("multer");
const upload = multer()
const validate = require("../../validate/admin/product-category.validate")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
    '/create',
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
)

router.get("/edit/:id",controller.edit);

router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch
);

router.get('/detail/:id',controller.detail)

router.delete('/delete/:id', controller.DeleteItem);

module.exports = router;