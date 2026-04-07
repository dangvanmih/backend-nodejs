module.exports.priceNewProducts = (products) => {
    const newProducts = products.map(item => {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(2); // thêm thuộc tính giá mới trực tiếp vào object gốc
    return item;
  });

  return newProducts
}