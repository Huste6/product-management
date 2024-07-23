const productRouter = require("./product.route")
const homeRouter = require('./home.router')
const categoryMiddleware = require('../../middlewares/client/product-category.middleware')
module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use('/', homeRouter);
    app.use("/product", productRouter);
}