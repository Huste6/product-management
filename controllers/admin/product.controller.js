const Product = require("../../models/product.model");
const filterStatusHelper=require("../../helpers/filterStatus")
const SearchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

// [GET] /admin/products
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

        // pagination
        const CountProducts = await Product.countDocuments(find);
        let objectPagination=paginationHelper({
            currentPage:1,
            limitItem: 4
        },req.query,CountProducts);
        // end pagination

        const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);

        res.render("admin/pages/products/index", {
            pageTitle: "Danh sach san pham",
            products: products,
            filterStatus: filterStatus,
            keyword: ObjectSearch.keyword,
            pagination:objectPagination
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async(req, res)=>{
    try{
        const status=req.params.status;
        const id=req.params.id;

        await Product.updateOne({_id: id},{status: status})

        res.redirect("back")
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}