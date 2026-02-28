module.exports = (objectPagination,query,countProducts) => {
  if(query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems; // công thức tính skip : trang hiện tại - 1 * số lượng giới hạn sản phẩm
  

  const totalPage = Math.ceil(countProducts/objectPagination.limitItems); // hàm ceil dùng để luôn làm tròn lên
  // console.log(totalPage);
  
  objectPagination.totalPage = totalPage;

  return objectPagination; // phải trả ra data thì bên kia mới nhận được
}