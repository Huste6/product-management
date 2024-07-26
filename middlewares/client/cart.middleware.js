const Cart = require("../../models/cart.model")

module.exports.CartId = async (req,res,next) => {
    if(!req.cookies.cartId){
        //tao gio hang
        const cart = new Cart();
        await cart.save();

        const expiresCookie = 365 * 24 * 60 * 60 * 1000;

        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expiresCookie)
        });
    }else{
        //lay ra gio hang
        const cart = await Cart.findOne({
            _id:req.cookies.cartId
        })
        if(cart){
            const totalQuantity = cart.products.reduce((sum,item) => sum + item.quantity, 0);
            cart.totalQuantity = totalQuantity
            res.locals.miniCart = cart;
        }
    }
    next();
}