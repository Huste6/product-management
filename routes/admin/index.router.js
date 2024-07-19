const systemConfig = require('../../config/system')
const dashboardRouter = require('./dashboard.router')
const productRouter = require('./product.router')
const productCategoryRouter = require('./product-category.router')
module.exports=(app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin
    
    app.use(PATH_ADMIN+'/dashboard',dashboardRouter);
    app.use(PATH_ADMIN+'/products',productRouter)
    app.use(PATH_ADMIN+'/product-category',productCategoryRouter)
}