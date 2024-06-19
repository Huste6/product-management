const Product = require("../../models/product.model");

// [GET] /admin/product
module.exports.index = async (req, res) => {
    try {
        let filterStatus = [
            {
                name: "Tat ca",
                status: "",
                class: req.query.status === "" || !req.query.status ? "active" : ""
            },
            {
                name: "Hoat dong",
                status: "active",
                class: req.query.status === "active" ? "active" : ""
            },
            {
                name: "Dung hoat dong",
                status: "inactive",
                class: req.query.status === "inactive" ? "active" : ""
            }
        ];

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
