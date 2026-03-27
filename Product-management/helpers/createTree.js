const createTree = (arr, parentId = "", state = { count: 0 }) => {
  const tree = [];

  arr.forEach((item) => {
    if (item.parent_id === parentId) {
      state.count++;
      const newItem = item;
      newItem.index = state.count;

      const children = createTree(arr, item.id, state);

      if (children.length > 0) {
        newItem.children = children;
      }

      tree.push(newItem);
    }
  });

  return tree;
};

module.exports.createTree = createTree;