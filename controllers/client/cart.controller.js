const Cart = require("../../models/cart.model")
const Product =require("../../models/product.model")
const ProductHelper = require("../../helpers/product")

//[GET] /cart
module.exports.index = async (req,res) => {
    const cartID = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartID
    })
    if(cart.products.length > 0){
        let totalPriceCart = 0;
        for(const item of cart.products) {
            const productID = item.product_id;
            const productInfo = await Product.findOne({
                _id:productID,
                status:"active",
                deleted:false
            }).select("title thumbnail slug price discountPercentage")
            productInfo.priceNew = ProductHelper.priceNewOne(productInfo);
            item.totalPrice = productInfo.priceNew * item.quantity
            totalPriceCart = totalPriceCart + item.totalPrice;
            item.productInfo = productInfo;
        }
        cart.totalPriceCart = totalPriceCart;
    }
    res.render("client/pages/cart/index",{
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    });
}
//[POST] /cart/add/:productID
module.exports.addPOST = async (req,res) => {
    const productID = req.params.productID;
    const quantity = parseInt(req.body.quantity);
    const cartID = req.cookies.cartId;
    
    const cart = await Cart.findOne({
        _id: cartID
    })
    
    const existProductInCart = cart.products.find(item => item.product_id == productID);
    if(existProductInCart){
        const quantityNew = quantity + existProductInCart.quantity;
        await Cart.updateOne(
            {
                _id:cartID,
                'products.product_id': productID
            },
            {
                $set:{
                    'products.$.quantity': quantityNew
                }
            }
        );
    }else{
        const objectCart = {
            product_id: productID,
            quantity: quantity
        }
        await Cart.updateOne(
            {
                _id:cartID
            },
            {
                $push:{products: objectCart}
            }
        );
    }
    req.flash("success","Đã thêm thành công vào giỏ hàng");
    res.redirect("back");
}