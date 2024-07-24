module.exports.priceNewProducts = (productsFeatured) => {
    productsFeatured.forEach((item) => {
        item.newPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(0);
    });
    return productsFeatured;
};
module.exports.priceNewOne = (product) => {
    return (product.price * (1 - product.discountPercentage / 100)).toFixed(0);
};