const systemConfig = require('../../config/system')
const dashboardRouter = require('./dashboard.router')
const productRouter = require('./product.router')
const productCategoryRouter = require('./product-category.router')
const RoleRouter = require("./role.router")
const AccountRouter = require("./account.router")
module.exports=(app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin
    
    app.use(PATH_ADMIN+'/dashboard',dashboardRouter);
    app.use(PATH_ADMIN+'/products',productRouter)
    app.use(PATH_ADMIN+'/product-category',productCategoryRouter)
    app.use(PATH_ADMIN+'/roles',RoleRouter)
    app.use(PATH_ADMIN+'/accounts',AccountRouter)
}