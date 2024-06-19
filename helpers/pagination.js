module.exports=(objectPagination,query,CountProducts)=>{
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1)*objectPagination.limitItem;
    const totalPage = Math.ceil(CountProducts/objectPagination.limitItem);
    objectPagination.totalPage=totalPage;

    return objectPagination;
}