const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");
const ProductCategory = require("../../models/product-category.model");
const ProductCategoryhelper = require("../../helpers/product-category")

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
// [GET] /product/:slugCategory
module.exports.Category = async (req,res) =>{
  let category = await ProductCategory.findOne({
    slug:req.params.slugCategory,
    deleted: false
  })

  const listSubCategory = await ProductCategoryhelper.getSubCategory(category.id)
  const listSubCategoryID = listSubCategory.map(item => item.id)

  let product = await Product.find({
    product_category_id: {$in: [category.id, ...listSubCategoryID]},
    deleted: false
  }).sort({position: "desc"})

  product = productHelper.priceNewProducts(product);

  res.render("client/pages/products/index",{
    pageTitle: category.title,
    products: product
  })
}