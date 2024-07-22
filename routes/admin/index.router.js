const systemConfig = require('../../config/system')
const authmiddleware = require('../../middlewares/admin/auth.middleware')
const dashboardRouter = require('./dashboard.router')
const productRouter = require('./product.router')
const productCategoryRouter = require('./product-category.router')
const RoleRouter = require("./role.router")
const AccountRouter = require("./account.router")
const AuthRouter = require("./auth.router")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(PATH_ADMIN + '/dashboard', authmiddleware.requireAuth, dashboardRouter);
    app.use(PATH_ADMIN + '/products', authmiddleware.requireAuth, productRouter)
    app.use(PATH_ADMIN + '/product-category', authmiddleware.requireAuth, productCategoryRouter)
    app.use(PATH_ADMIN + '/roles', authmiddleware.requireAuth, RoleRouter)
    app.use(PATH_ADMIN + '/accounts', authmiddleware.requireAuth, AccountRouter)
    app.use(PATH_ADMIN + '/auth', AuthRouter)
}