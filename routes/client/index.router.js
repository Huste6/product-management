const productRouter = require("./product.route")
const homeRouter = require('./home.router')
const categoryMiddleware = require('../../middlewares/client/product-category.middleware')
const searchRouter = require("./search.router");
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const CartRouter = require("./cart.router");
const checkoutRouter = require('./checkout.router')
const UserRouter = require('./user.router')
const userMiddleware = require('../../middlewares/client/user.middleware')

module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.CartId)
    app.use(userMiddleware.infoUser)
    app.use('/', homeRouter);
    app.use("/product", productRouter);
    app.use("/search", searchRouter);
    app.use("/cart",CartRouter)
    app.use("/checkout",checkoutRouter);
    app.use("/user",UserRouter);
}