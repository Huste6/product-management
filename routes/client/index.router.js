const productRouter = require("./product.route")
const homeRouter = require('./home.router')
const categoryMiddleware = require('../../middlewares/client/product-category.middleware')
const searchRouter = require("./search.router");
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const CartRouter = require("./cart.router");

module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.CartId)
    app.use('/', homeRouter);
    app.use("/product", productRouter);
    app.use("/search", searchRouter);
    app.use("/cart",CartRouter)
}