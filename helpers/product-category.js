const ProductCategory = require("../models/product-category.model")

module.exports.getSubCategory = async (parentID) => {
    const getcategory =  async (parentID)=>{
        const subs= await ProductCategory.find({
          parent_id: parentID,
          status:"active",
          deleted:false
        });
        let allSub = [...subs];
        for(const sub of allSub){
          const childs = await getcategory(sub.id);
          allSub = allSub.concat(childs);
        }
        return allSub;
    }
    const result = await getcategory(parentID);
    return result;
}