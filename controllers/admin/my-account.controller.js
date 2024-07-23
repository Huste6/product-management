const md5 = require('md5')
const Account = require("../../models/account.model");

// [GET] /admin/my-Account
module.exports.index = (req,res)=>{
    res.render("admin/pages/myAccount/index",{
        pageTitle:"Thông tin cá nhân"
    })
}

// [GET] /admin/my-Account/edit
module.exports.edit = (req,res)=>{
    res.render("admin/pages/myAccount/edit",{
        pageTitle:"Chỉnh sửa thông tin cá nhân"
    })
}

// [PATCH] /admin/my-Account/edit
module.exports.editPatch = async (req,res) => {
    const emailExist = await Account.findOne({
        _id: {$ne: res.locals.user.id},
        email: req.body.email,
        deleted: false,
    })
    if(emailExist){
        req.flash("error","Email này đã tồn tại");
    }else{
        if(req.body.password){
            req.body.password = md5(req.body.password)
        }else{
            delete req.body.password
        }
        await Account.updateOne({_id: res.locals.user.id},req.body)
        req.flash("success","Cập nhật thành công")
    }
    res.redirect("back");
}