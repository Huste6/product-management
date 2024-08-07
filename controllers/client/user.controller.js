const User = require("../../models/user.model")
const md5 = require("md5")
const generate = require("../../helpers/generate");
const forgotPassword = require("../../models/forgot-password.model")
const sendMailHelper = require("../../helpers/sendMail");
const Cart = require("../../models/cart.model")

//[GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản"
    });
}
//[POST] /user/register
module.exports.registerPost = async (req, res) => {
    try {
        req.body.password = md5(req.body.password);
        const existEmail = await User.findOne({
            email: req.body.email
        })
        const existpassword = await User.findOne({
            password: req.body.password
        })
        if (existEmail) {
            req.flash("error", "Đã tồn tại email!");
            return res.redirect("back");
        }
        if (existpassword) {
            req.flash("error", "Đã tồn tại password!");
            return res.redirect("back");
        }
        const user = new User(req.body);
        await user.save();
        res.cookie("tokenUser",user.tokenUser);
        res.redirect("/")
    }catch(error){
        console.error(error);
        req.flash("error", "Đã xảy ra lỗi!");
        return res.redirect("back");
    }
}
//[GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản"
    });
}
//[POST] /user/login
module.exports.loginPost = async (req, res) => {
    try {
        const email = req.body.email;
        const password = md5(req.body.password);
        const user = await User.findOne({
            email: email,
            deleted:false
        })
        if(!user){
            req.flash("error", "Không tồn tại email!");
            return res.redirect("back");
        }
        if(user.password !== password){
            req.flash("error", "Sai mật khẩu!");
            return res.redirect("back");
        }
        if(user.status === "inactive"){
            req.flash("error","Tài khoản đang bị khóa");
            return res.redirect("back");
        }
        const cart = await Cart.findOne({
            user_id: user.id
        });
        if(cart){
            res.cookie("cartId",cart.id);
        }else{
            await Cart.updateOne(
                {
                    _id: req.cookies.cartId
                },
                {
                    user_id: user.id
                }
            )
        } 
        res.cookie("tokenUser",user.tokenUser);
        
        await User.updateOne({
            tokenUser: user.tokenUser
        },{
            statusOnline: "online"
        }) 
        _io.once('connection',  (socket) => {
            socket.broadcast.emit("SERVER_RETURN_USER_ONLINE",user.id);
        })
        res.redirect("/")
    }catch(error){
        console.error(error);
        req.flash("error", "Đã xảy ra lỗi!");
        return res.redirect("back");
    }
}
//[GET] /user/logout
module.exports.logout = async (req,res) => {
    await User.updateOne({
        tokenUser: req.cookies.tokenUser
    },{
        statusOnline: "offline"
    });
    res.clearCookie("cartId")
    res.clearCookie("tokenUser");
    res.redirect("/")
}
//[GET] /user/password/forgot
module.exports.forgotPassword = async (req,res) => {
    res.render("client/pages/user/forgotPassword",{
        pageTitle: "Lấy lại mật khẩu"
    });
}
//[POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req,res) => {
    const email = req.body.email;
    const user = await User.findOne({
        email:email,
        deleted:false
    })
    if(!email){
        req.flash("error", "Không tồn tại email!");
        return res.redirect("back");
    }
    const otp = generate.generateRandomNumber(8)
    // Lưu thông tin vào db
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }
    const forgot = new forgotPassword(objectForgotPassword);
    await forgot.save();

    //neu ton tai gui otp qua email
    const subject = "Mã OTP xác minh lấy lại mật khẩu: "
    const html = `
        Mã OTP để lấy lại mật khẩu là <b>${otp}</b> Thời hạn sử dụng 3 phút
    `
    sendMailHelper.sendMail(email,subject,html);

    res.redirect(`/user/password/otp?email=${email}`);
}
//[GET] /user/password/otp?email=:email
module.exports.otpPassword = async (req,res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password",{
        pageTitle: "Nhập mã OTP",
        email: email
    })
}
//[POST] /user/password/otp
module.exports.otpPasswordPost = async (req,res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const result = await forgotPassword.findOne({
        email:email,
        otp:otp
    })
    if(!result){
        req.flash("error","OTP không hợp lệ!");
        res.redirect("back");
        return;
    }
    const user = await User.findOne({
        email:email
    });
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/user/password/reset");
}
//[GET] /user/password/reset
module.exports.reset = async (req,res) => {
    res.render("client/pages/user/reset-password",{
        pageTitle: "Đổi mật khẩu"
    })
}
//[POST] /user/password/reset
module.exports.resetPOST = async (req,res) => {
    const password = md5(req.body.password);
    const confirmPassword = req.body.confirmPassword;
    const tokenUser = req.cookies.tokenUser;
    await User.updateOne(
        {
            tokenUser: tokenUser
        },
        {
            password: password
        }
    );
    req.flash("success","Đổi mật khẩu thành công");
    res.redirect("/");
}
//[GET] /user/info
module.exports.info = async (req,res) => {
    res.render("client/pages/user/info",{
        pageTitle: "Thông tin tài khoản"
    })
}   