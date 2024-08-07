const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus")
const SearchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const systemConfig = require('../../config/system')
const createTreeHelpers = require('../../helpers/create-tree')
const ProductCategory = require("../../models/product-category.model")
const Account = require("../../models/account.model")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    try {
        // Doan nay la doan bo loc
        const filterStatus = filterStatusHelper(req.query);

        let find = {
            deleted: false
        };
        if (req.query.status) {
            find.status = req.query.status;
        }
        // Doan code phan tim kiem
        const ObjectSearch = SearchHelper(req.query);
        if (ObjectSearch.regex) {
            find.title = ObjectSearch.regex
        }
        // 
        // pagination
        const CountProducts = await Product.countDocuments(find);
        let objectPagination = paginationHelper({
            currentPage: 1,
            limitItem: 4
        }, req.query, CountProducts);
        // end pagination

        // sort
        let sort = {};
        if(req.query.sortKey && req.query.sortValue){
            sort[req.query.sortKey] = req.query.sortValue; 
        }else{
            sort.position="desc";
        }
        // end sort
        
        const products = await Product.find(find)
            .sort(sort)
            .limit(objectPagination.limitItem)
            .skip(objectPagination.skip);

        for (const product of products) {
            // Lấy ra thông tin người tạo
            const user = await Account.findOne({
                _id: product.createdBy.account_id
            });
            if(user){
                product.accountFullName = user.fullname
            }
            // Lấy ra thông tin người cập nhật gần nhất
            const updatedBy = product.updatedBy[product.updatedBy.length-1];
            if(updatedBy){
                const userUpdate = await Account.findOne({
                    _id: updatedBy.account_id
                });
                updatedBy.accountFullName = userUpdate.fullname
            }
        }
        
        res.render("admin/pages/products/index", {
            pageTitle: "Danh sach san pham",
            products: products,
            filterStatus: filterStatus,
            keyword: ObjectSearch.keyword,
            pagination: objectPagination
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const id = req.params.id;

        const updatedBy = {
            account_id: res.locals.user.id,
            updateAt: new Date()
        }
        
        await Product.updateOne(
            {_id: id},
            {
                status: status,
                $push: {updatedBy: updatedBy}
            }
        )

        req.flash("success","Cap nhat trang thai san pham thanh cong!")

        res.redirect("back")
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        // console.log(req.body)
        const type = req.body.type
        const ids = req.body.ids.split(", ")
        const updatedBy = {
            account_id: res.locals.user.id,
            updateAt: new Date()
        }
        switch (type) {
            case "active":
                await Product.updateMany(
                    { _id: { $in: ids } }, 
                    {
                        status: "active",
                        $push: {updatedBy: updatedBy}
                    }
                )
                req.flash("success",`Cap nhat trang thai ${ids.length} san pham thanh cong!`)
                break;
            case "inactive":
                await Product.updateMany(
                    { _id: { $in: ids } }, 
                    { 
                        status: "inactive",
                        $push: {updatedBy: updatedBy}
                    }
                )
                req.flash("success",`Cap nhat trang thai ${ids.length} san pham thanh cong!`)
                break;
            case "delete-all":
                await Product.updateMany(
                    { _id: { $in: ids } },
                    { 
                        deleted: true, 
                        // deletedAt: new Date() 
                        deletedBy:{
                            account_id: res.locals.user.id,
                            deletedAt: new Date()
                        } 
                    }
                )
                req.flash("success",`Xoa ${ids.length} san pham thanh cong!`)
                break;
            case "change-position":
                for (const item of ids) {
                    let [id,position] = item.split("-")
                    position=parseInt(position);
                    await Product.updateOne(
                        {_id: id},
                        {
                            position: position,
                            $push: {updatedBy: updatedBy}
                        }
                    )
                } 
                req.flash("success","Cap nhat trang thai san pham thanh cong!")
                break;
            default:
                break;
        }
        res.redirect("back")
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

// [DELETE] /admin/products/delete/:id
module.exports.DeleteItem = async (req, res) => {
    try {
        const id = req.params.id;

        await Product.updateOne(
            { _id: id }, 
            { 
                deleted: true, 
                deletedBy:{
                    account_id: res.locals.user.id,
                    deletedAt: new Date()
                } 
            }
        )

        req.flash("success",`Xoa san pham thanh cong!`)

        res.redirect("back")
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

//[GET] /admin/products/create
module.exports.create = async (req,res) => {
    try{
        const record = await ProductCategory.find({
            deleted: false
        })
        const newRecord = createTreeHelpers.tree(record)

        res.render("admin/pages/products/create", {
            pageTitle: "Them moi san pham",
            record: newRecord
        });
    }catch(error){
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
}

//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    try {
        req.body.price=parseInt(req.body.price)
        req.body.discountPercentage=parseInt(req.body.discountPercentage)
        req.body.stock=parseInt(req.body.stock)

        if(req.body.position == ''){
            const CountProducts = await Product.countDocuments();
            req.body.position = CountProducts + 1;
        }else{
            req.body.position = parseInt(req.body.position);
        }

        req.body.createdBy = {
            account_id: res.locals.user.id
        };

        const product = new Product(req.body);
        await product.save();

        res.redirect(`${systemConfig.prefixAdmin}/products`)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

//[GET] /admin/products/edit/:id
module.exports.edit = async (req,res) => {
    try{
        const record = await ProductCategory.find({
            deleted: false
        })
        const newRecord = createTreeHelpers.tree(record)

        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);

        res.render("admin/pages/products/edit.pug", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product,
            record: newRecord
        });
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}

//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req,res) => {
    const id = req.params.id;
    req.body.price=parseInt(req.body.price)
    req.body.discountPercentage=parseInt(req.body.discountPercentage)
    req.body.stock=parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position);
    
    try{
        const updatedBy = {
            account_id: res.locals.user.id,
            updateAt: new Date()
        }
        
        await Product.updateOne(
            {_id: id},
            {
                ...req.body, 
                $push: {updatedBy: updatedBy}
            }
        )
        req.flash("success",`Cap nhat thanh cong!`)
    }catch(error){
        req.flash("error",`Cap nhat that bai!`)
    }
    res.redirect("back");
}

//[GET] /admin/products/detail/:id
module.exports.detail = async (req,res) => {
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        };
        const product = await Product.findOne(find);

        res.render("admin/pages/products/detail",{
            pageTitle: product.title ,
            product: product
        });
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}