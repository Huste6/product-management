const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");

// [GET] /
module.exports.index = async (req, res) => {
    // san pham noi bat
    let productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    });
    productsFeatured = productHelper.priceNewProducts(productsFeatured);
    // san pham moi nhat
    const productsNew = await Product.find({
        deleted:false,
        status:"active"
    }).sort({position:"desc"}).limit(6);
    res.render("client/pages/home/index", {
        pageTitle: "Trang chu",
        productsFeatured: productsFeatured,
        productsNew: productsNew
    });
};