const productRouter = require("./product.route")
const homeRouter = require('./home.router')
const categoryMiddleware = require('../../middlewares/client/product-category.middleware')
const searchRouter = require("./search.router");
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const CartRouter = require("./cart.router");
const checkoutRouter = require('./checkout.router')
const UserRouter = require('./user.router')
const userMiddleware = require('../../middlewares/client/user.middleware')
const settingMiddleware = require('../../middlewares/client/setting.middleware')
const chatRouter = require('./chat.router')
const authMiddleware = require("../../middlewares/client/auth.middleware")
const UsersRouter = require('./users.router')
const RoomChatRouter = require('./room-chat.router')

module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.CartId)
    app.use(userMiddleware.infoUser)
    app.use(settingMiddleware.settingGeneral);
    
    app.use('/', homeRouter);
    app.use("/product", productRouter);
    app.use("/search", searchRouter);
    app.use("/cart",CartRouter)
    app.use("/checkout",checkoutRouter);
    app.use("/user",UserRouter);
    app.use("/chat",authMiddleware.requireAuth,chatRouter);
    app.use("/users",authMiddleware.requireAuth,UsersRouter);
    app.use("/room-chat",authMiddleware.requireAuth,RoomChatRouter);
}