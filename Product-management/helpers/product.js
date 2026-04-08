module.exports.priceNewProducts = (products) => {
  const newProducts = products.map(item => {
    const priceNew = (item.price * (100 - item.discountPercentage) / 100); // thêm thuộc tính giá mới trực tiếp vào object gốc
    item.priceNew = Math.round(priceNew); // math.round trả về dạng number còn tofixed trả về dạng string
    return item;
  });

  return newProducts
}



module.exports.priceNewProduct = (product) => {

    const priceNew = (product.price * (100 - product.discountPercentage) / 100);
    product.priceNew = Math.round(priceNew);

    return priceNew;
}