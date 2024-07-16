const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/product.controller")

router.get('/',controller.index);

router.patch('/change-status/:status/:id',controller.changeStatus);

router.patch('/change-multi',controller.changeMulti)

router.delete('/delete/:id',controller.DeleteItem);

router.get('/create',controller.create); // lay ra trang tao moi san pham

router.post('/create',controller.createPost);

module.exports = router;