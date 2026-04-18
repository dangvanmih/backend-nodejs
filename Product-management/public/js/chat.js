//CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");

if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;

    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
    }

  });

}

// END CLIENT_SEND_MASSAGE

//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const body = document.querySelector(".chat .inner-body");
  const myId = document.querySelector("[my-id]").getAttribute("my-id");

  if (body) {
    const div = document.createElement("div");
    let htmlFullName = "";

    // So sánh ID để quyết định bên trái hay bên phải
    if (myId == data.userId) {
      div.classList.add("inner-outgoing");
    } else {
      div.classList.add("inner-incoming");
      htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    }

    div.innerHTML = `
      ${htmlFullName}
      <div class="inner-content">${data.content}</div>
    `;
    
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }
});

// Tự động cuộn xuống cuối khi load xong trang
const body = document.querySelector(".chat .inner-body");
if (body) {
  body.scrollTop = body.scrollHeight;
}