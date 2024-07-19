const ProductCategory = require("../../models/product-category.model")
const systemConfig = require('../../config/system')

//[GET] /admin/product-category
module.exports.index = async (req, res) => {
    try {
        let find = {
            deleted: false
        };
        const records = await ProductCategory.find(find);

        res.render("admin/pages/product-category/index", {
            pageTitle: "Danh mục sản phẩm",
            records: records
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//[GET] /admin/product-category/create
module.exports.create = async (req, res) => {
    try {
        res.render("admin/pages/product-category/create", {
            pageTitle: "Tạo danh mục sản phẩm"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//[POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
    try {
        if(req.body.position == ""){
            const CountProductCategory = await ProductCategory.countDocuments();
            req.body.position = CountProductCategory + 1;
        }else{
            req.body.position = parseInt(req.body.position);
        }
        const record = new ProductCategory(req.body);
        await record.save();

        res.redirect(`${systemConfig.prefixAdmin}/product-category`)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}