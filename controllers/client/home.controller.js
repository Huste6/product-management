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
    res.render("client/pages/home/index", {
        pageTitle: "Trang chu",
        productsFeatured: productsFeatured
    });
};