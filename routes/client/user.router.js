const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/user.controller")
const validate = require("../../validate/client/user.validate")

router.get('/register',controller.register);

router.post('/register',validate.register,controller.registerPost);

router.get('/login',controller.login);

router.post('/login',validate.login,controller.loginPost);

router.get('/logout',controller.logout);

router.get('/password/forgot',controller.forgotPassword);

router.post('/password/forgot',validate.forgotPasswordPost,controller.forgotPasswordPost);

router.get('/password/otp',controller.otpPassword);

router.post('/password/otp',validate.otpPasswordPost,controller.otpPasswordPost);

router.get('/password/reset',controller.reset);

router.post('/password/reset',validate.resetPasswordPost,controller.resetPOST);

module.exports = router;