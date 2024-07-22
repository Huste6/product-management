const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/account.controller")
const multer = require('multer')
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
const validate = require("../../validate/admin/account.validate")
router.get("/",controller.index);

router.get("/create",controller.create);

router.post(
    "/create",
    upload.single('avatar'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPOST
);

router.patch('/change-status/:status/:id',controller.changeStatus)

module.exports = router;