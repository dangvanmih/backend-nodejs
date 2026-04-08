const productCategory = require("../../models/products-category.model");

module.exports.getSubCategory = async (parentId) => {
  const getCategory = async (parentId) => {
    const subs = await productCategory.find({
      deleted: false,
      status: "active",
      parent_id: parentId,
    });

    let allSub = [...subs];

    for (const sub of subs) {
      const childs = await getCategory(sub.id);
      allSub = allSub.concat(childs)
    }

    return allSub;
  }
  const result = await getCategory(parentId);
  return result;
}