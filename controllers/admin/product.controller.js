const Product = require("../../models/product.model");
const filterStatusHelper=require("../../helpers/filterStatus")
const SearchHelper = require("../../helpers/search")

// [GET] /admin/product
module.exports.index = async (req, res) => {
    try {
        // Doan nay la doan bo loc
        const filterStatus=filterStatusHelper(req.query);

        let find = {
            deleted: false
        };
        if (req.query.status) {
            find.status = req.query.status;
        }
        // Doan code phan tim kiem
        const ObjectSearch = SearchHelper(req.query);
        if(ObjectSearch.regex){
            find.title=ObjectSearch.regex
        }

        const products = await Product.find(find);

        res.render("admin/pages/products/index", {
            pageTitle: "Danh sach san pham",
            products: products,
            filterStatus: filterStatus,
            keyword: ObjectSearch.keyword
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
