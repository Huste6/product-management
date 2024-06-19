const Product = require("../../models/product.model");
const filterStatusHelper=require("../../helpers/filterStatus")

// [GET] /admin/product
module.exports.index = async (req, res) => {
    try {
        // Doan nay la doan bo loc
        const filterStatus=filterStatusHelper(req.query);

        let find = {
            deleted: false
        };
        let keyword=""

        if (req.query.status) {
            find.status = req.query.status;
        }

        if (req.query.keyword) {
            keyword = req.query.keyword

            //c1: find.title = { $regex: keyword, $options: "i" };
            // c2:
            const regex = new RegExp(keyword,"i")
            find.title=regex
        }

        const products = await Product.find(find);

        res.render("admin/pages/products/index", {
            pageTitle: "Danh sach san pham",
            products: products,
            filterStatus: filterStatus,
            keyword: keyword
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
