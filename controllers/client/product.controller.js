const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");

// [GET] /product
module.exports.index = async (req, res) => {
  try {
    let products = await Product.find({
      status: "active",
      deleted: false,
    }).sort({position: "desc"})

    products = productHelper.priceNewProducts(products);

    res.render("client/pages/products/index", {
      pageTitle: "Trang danh sach san pham",
      products: products
    });
  }catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// [GET] /product/:slug
module.exports.detail = async (req,res) => {
  try{
    const find = {
      deleted: false,
      slug: req.params.slug,
      status: "active"
    };

    const product = await Product.findOne(find);
    
    res.render("client/pages/products/detail",{
      pageTitle: "Chi tiết sản phẩm",
      product: product
    })
  }catch(error){
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}