const Role = require("../../models/role.model")
const systemConfig = require('../../config/system')

// [GET] /admin/roles
module.exports.index = async (req,res) => {
    let find = {
        deleted: false
    }
    const record = await Role.find(find);

    res.render("admin/pages/roles/index",{
        pageTitle: "Nhóm Quyền",
        record: record
    })
}

// [GET] /admin/roles/create
module.exports.create = async (req,res) => {
    res.render("admin/pages/roles/create",{
        pageTitle: "Tạo nhóm Quyền"
    })
}

// [POST] /admin/roles/create
module.exports.createPost = async (req,res) => {
    const record = new Role(req.body)
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req,res) => {
    try{
        const record = await Role.findOne({
            _id:req.params.id,
            deleted: false
        })

        res.render("admin/pages/roles/edit",{
            pageTitle: "Sửa nhóm Quyền",
            record: record
        })
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req,res) => {
    try{
        await Role.updateOne({
            _id: req.params.id
        },req.body)
        req.flash("success","Cập nhật nhóm quyền thành công")
    }catch(error){
        req.flash("error","Cập nhật nhóm quyền thất bại!")      
    }
    res.redirect("back");
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req,res) => {
    const record = await Role.find({
        deleted: false
    })
    
    res.render("admin/pages/roles/permissions",{
        pageTitle: "Phân Quyền",
        record: record
    })
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req,res) => {
    const permission = JSON.parse(req.body.permissions);
    for (const item of permission) {
        await Role.updateOne({_id: item.id},{permissions: item.permission})
    }
    req.flash("success","Cập nhật quyền thành công")
    res.redirect("back");
}