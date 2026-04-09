const productCategory = require("../models/products-category.model");

// Viết hàm lấy danh mục con
const getSubCategory = async (parentId) => {
  const subs = await productCategory.find({
    deleted: false,
    status: "active",
    parent_id: parentId,
  });

  let allSub = [...subs];

  for (const sub of subs) {
    // Đệ quy: Gọi lại chính nó để tìm cấp sâu hơn
    const childs = await getSubCategory(sub.id);
    allSub = allSub.concat(childs);
  }

  return allSub;
};

// Export hàm ra để Controller sử dụng
module.exports.getSubCategory = getSubCategory;