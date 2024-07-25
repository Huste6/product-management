const Product = require("../../models/product.model")
const Cart = require("../../models/cart.model")
const ProductHelper = require("../../helpers/product")
const Order = require("../../models/order.model")

//[GET] /checkout
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
    res.render("client/pages/checkout/index",{
        pageTitle: "Dat hang",
        cartDetail: cart
    });
}
//[POST] /checkout/order
module.exports.order = async (req,res) => {
    const cartID = req.cookies.cartId;
    const userInfo = req.body;
    const cart = await Cart.findOne({
        _id:cartID
    });
    const productsOrder = [];
    for(const product of cart.products) {
        const objectProduct = {
            product_id: product.product_id,
            quantity: product.quantity,
            discountPercentage: 0,
            price: 0
        }
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("price discountPercentage");
        objectProduct.price = productInfo.price
        objectProduct.discountPercentage = productInfo.discountPercentage
        productsOrder.push(objectProduct)
    }
    const orderInfo = {
        cart_id: cartID,
        userInfo:userInfo,
        products:productsOrder
    }
    const order = new Order(orderInfo);
    order.save();

    await Cart.updateOne(
        {
            _id:cartID
        },{
            products: []
        }
    )
    res.redirect(`/checkout/success/${order.id}`)
}
//[GET] /checkout/success/:OrderID
module.exports.success = async (req,res) => {
    const order = await Order.findOne({
        _id: req.params.OrderID
    });
    for (const product of order.products) {
        const productInfo = await Product.findOne({
            _id:product.product_id
        }).select("title thumbnail price discountPercentage");
        product.productInfo=productInfo;
        product.priceNew = ProductHelper.priceNewOne(productInfo);
        product.totalPrice = product.priceNew * product.quantity;
    }
    order.totalPrice = order.products.reduce((sum,item) => sum + item.totalPrice ,0)
    req.flash("success","Đặt hàng thành công!");
    res.render("client/pages/checkout/success",{
        pageTitle: "Đặt hàng thành công",
        order: order
    });
}