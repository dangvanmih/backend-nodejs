// change-status 
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if(buttonChangeStatus){

  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonChangeStatus.forEach(button => {
    button.addEventListener("click",() => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = statusCurrent == "active" ? "inactive" : "active";

      // console.log(statusChange);
      // // console.log(statusCurrent);
      // console.log(id);
      
      const action = path + `/${statusChange}/${id}?_method=PATCH`;  // bên view phải là POST thì bên này mới ghi đè được , và phải thay đổi phương thức bên router nữa. 

      formChangeStatus.action = action; // vì nó là thuộc tính có sẵn nên gán lại action bên form bằng action mới; còn attribute tự định nghĩa thì phải dùng setattibute thì mới sửa được

      formChangeStatus.submit(); // không cần button để submit lên vì js có hỗ trợ hàm submit
    });
  });
}


// end change-status 