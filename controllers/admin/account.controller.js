const Account = require("../../models/account.model");
const Role = require("../../models/role.model")
const systemConfig = require('../../config/system')
const md5 = require('md5')

//[GET] /admin/accounts
module.exports.index = async (req,res) => {
    const record = await Account.find({deleted:false}).select("-password -token");
    for (const item of record) {
        const role = await Role.findOne({_id: item.role_id});
        item.role_title = role.title;
    }
    res.render("admin/pages/accounts/index.pug",{
        pageTitle: "Danh sách tài khoản",
        record: record
    })
}

// [GET] /admin/accounts/create
module.exports.create = async (req,res) => {
    const role = await Role.find({
        deleted: false
    });

    res.render("admin/pages/accounts/create",{
        pageTitle: "Tạo tài khoản",
        role: role
    })
}

// [POST] /admin/accounts/create
module.exports.createPOST = async (req,res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false,
    })
    if(emailExist){
        req.flash("error","Email này đã tồn tại");
        res.redirect("back");
    }else{
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}

//[PATCH] /admin/accounts/change-status/:status/:id
module.exports.changeStatus = async (req,res) => {
    try{
        await Account.updateOne(
            {
                _id: req.params.id
            },{
                status: req.params.status
            }
        )
        req.flash("success","Cập nhật trạng thái tài khoản thành công!")
        res.redirect("back");
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req,res) => {
    try{
        const data = await Account.findOne({
            _id: req.params.id,
            deleted: false
        })
        const role = await Role.find({deleted: false})

        res.render("admin/pages/accounts/edit",{
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            role: role
        })
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req,res) => {
    try{
        const emailExist = await Account.findOne({
            _id: {$ne: req.params.id},
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
            await Account.updateOne({_id: req.params.id},req.body)
            req.flash("success","Cập nhật thành công")
        }
        res.redirect("back");
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}