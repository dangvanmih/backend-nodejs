// Button Status
const buttonStatus = document.querySelectorAll("[button-status]"); // để lấy các thuộc tính tự định nghĩa thì bọc bởi []
//check xem nếu lấy ra được các thẻ rồi thì mới xử lý logic
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href); // lấy ra url bằng hàm URL và phải dùng hàm URL thì với dùng được hàm searchParams.set để set lại params
  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status); // hàm searchParams là lấy url hiện tại và set thêm các key phía sau
      }
      else {
        url.searchParams.delete("status");
      }
      // console.log(url.href);
      window.location.href = url.href // chuyển hướng sang trang khác
    })
  });
}
// end-button status

//form search
const formSearch = document.querySelector("#form-search")
if (formSearch) {
  let url = new URL(window.location.href) // vẫn phải thêm url tại vì khi tìm kiếm theo trạng thái thì bắt buộc phải lấy url hiện tại rồi mới tìm kiếm
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = e.target.elements.keyword.value;
    if (value) {
      url.searchParams.set("keyword", value); // hàm searchParams là lấy url hiện tại và set thêm các key phía sau
    }
    else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href // chuyển hướng sang trang khác
  })
}
//end-form seacrh


// pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
// check nếu lấy đc buttonPagination thì làm tiếp
if (buttonPagination) {
  let url = new URL(window.location.href);
  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      if (page) {
        url.searchParams.set("page", page);
      }
      else {
        url.searchParams.delete("page");
      }
      window.location.href = url.href // chuyển hướng sang trang khác
    });
  })

}
//end-pagination


// //checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputIds = checkboxMulti.querySelectorAll("input[name ='id']");
  inputCheckAll.addEventListener("click", () => {
    // vì inputIds trả ra là 1 dạng NodeList (danh sách nhiều checkbox) nên phải lặp qua từng phần tử
    inputIds.forEach(input => {
      input.checked = inputCheckAll.checked;
    });
  });

  inputIds.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

      if (countChecked == inputIds.length) {
        inputCheckAll.checked = true;
      }
      else {
        inputCheckAll.checked = false;
      }
    });
  });

}
// end-checkbox-multi


// Form change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
    
    const typeChange = e.target.elements.type.value;
    
    if(typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa tất cả những sản phẩm này không?")

      if(!isConfirm) {
        return; // nếu ấn hủy thì phần bên dưới không chạy
      }
    }
    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputChecked.forEach(input => {
        const id = input.value;
        ids.push(id);
      })
      // console.log(ids.join(", ")); 
      inputIds.value = ids.join(", ") // join để convert sang dạng string tại vì form không gửi được dạng mảng
      formChangeMulti.submit();
    }
    else {
      alert("Vui lòng chọn ít nhất một bản ghi!");
    }
  });
}
// End form change multi
