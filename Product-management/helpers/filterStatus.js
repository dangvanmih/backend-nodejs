module.exports = (query) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Hoạt động",
      status: "active"
    },
    {
      name: "Dừng hoạt động",
      status: "inactive"
    },
  ]


  if (query.status) {
    const index = filterStatus.findIndex(item => item.status == query.status); // lặp qua từng bản ghi của filterStatus và lấy ra item.status == req.query.status 
    filterStatus[index].class = "active";
  }
  else {
    const index = filterStatus.findIndex(item => item.status == ""); // lặp qua từng bản ghi của filterStatus và lấy ra item.status == rỗng
    filterStatus[index].class = "active";
  }

  return filterStatus; // xử lý logic xong phải return ra kết quả
}