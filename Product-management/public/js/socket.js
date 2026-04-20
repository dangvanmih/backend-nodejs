// Lấy ID và FullName từ chính thẻ .chat trong HTML
const chatElement = document.querySelector(".chat");
const myId = chatElement ? chatElement.getAttribute("my-id") : "";
const myName = chatElement ? chatElement.getAttribute("my-name") : "Ẩn danh";

// Khởi tạo socket với thông tin auth
const socket = io({
  auth: {
    userId: myId,
    fullName: myName
  }
});