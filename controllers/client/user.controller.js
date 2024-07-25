const User = require("../../models/user.model")
const md5 = require("md5")
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