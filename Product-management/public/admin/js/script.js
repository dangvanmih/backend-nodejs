// Button Status

const buttonStatus = document.querySelectorAll("[button-status]"); // để lấy các thuộc tính tự định nghĩa thì bọc bởi []
//check xem nếu lấy ra được các thẻ rồi thì mới xử lý logic
if(buttonStatus.length > 0)
{
  let url = new URL(window.location.href); // lấy ra url bằng hàm URL và phải dùng hàm URL thì với dùng được hàm searchParams.set để set lại params
  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if(status)
      {
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