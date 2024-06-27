const Product = require("../../models/product.model");
// [GET] /products
module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false,
    }).sort({position: "desc"})
    ;

    products.forEach((item) => {
      item.newPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(0);
    });

    console.log(products);

    res.render("client/pages/products/index", {
      pageTitle: "Trang danh sach san pham",
      products: products
    });
  }catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
