const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/cart.controller")

router.get("/",controller.index);

router.post('/add/:productID',controller.addPOST);

router.get('/delete/:productID',controller.deleteProduct);

module.exports = router;