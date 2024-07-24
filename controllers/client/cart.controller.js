const Cart = require("../../models/cart.model")

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