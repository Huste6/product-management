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
    }
    next();
}