module.exports.priceNewProducts = (productsFeatured) => {
    productsFeatured.forEach((item) => {
        item.newPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(0);
    });
    return productsFeatured;
};
