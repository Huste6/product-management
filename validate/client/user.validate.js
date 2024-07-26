module.exports.register = (req,res,next) =>{
    if(!req.body.fullName){
        req.flash("error",`Vui lòng nhập họ tên!`);
        res.redirect("back");
        return;
    }
    if(!req.body.email){
        req.flash("error",`Vui lòng nhập email!`);
        res.redirect("back");
        return;
    }
    if(!req.body.password){
        req.flash("error",`Vui lòng nhập mật khẩu!`);
        res.redirect("back");
        return;
    }
    if(!req.body.confirmPassword){
        req.flash("error",`Vui lòng xác nhận mật khẩu!`);
        res.redirect("back");
        return;
    }
    next();
}
module.exports.login = (req,res,next) =>{
    if(!req.body.email){
        req.flash("error",`Vui lòng nhập email!`);
        res.redirect("back");
        return;
    }
    if(!req.body.password){
        req.flash("error",`Vui lòng nhập mật khẩu!`);
        res.redirect("back");
        return;
    }
    next();
}
module.exports.forgotPasswordPost = (req,res,next) => {
    if(!req.body.email){
        req.flash("error",`Vui lòng nhập email!`);
        res.redirect("back");
        return;
    }
    next();
} 
module.exports.otpPasswordPost = (req,res,next) => {
    if(!req.body.otp){
        req.flash("error",`Vui lòng nhập otp!`);
        res.redirect("back");
        return;
    }
    next();
}
module.exports.resetPasswordPost = (req,res,next) => {
    if(!req.body.password){
        req.flash("error",`Vui lòng nhập mật khẩu!`);
        res.redirect("back");
        return;
    }
    if(!req.body.confirmPassword){
        req.flash("error",`Vui lòng xác nhận mật khẩu!`);
        res.redirect("back");
        return;
    }
    next();
}