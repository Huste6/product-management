const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        // user_id: String,
        cart_id: String,
        userInfo:{
            fullName: String,
            phone: String,
            address: String
        },
        products:[
            {
                product_id: String,
                quantity: Number,
                discountPercent: Number,
                price: Number
            }
        ],
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps:true
    }
)

const Order = mongoose.model("Order", OrderSchema, "orders");
module.exports = Order;
