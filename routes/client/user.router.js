const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/user.controller")
const validate = require("../../validate/client/user.validate")

router.get('/register',controller.register);

router.post('/register',validate.register,controller.registerPost);

module.exports = router;