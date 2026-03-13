// scroll-header
let lastScroll = 0; //vị trí scroll của lần trước
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > lastScroll) { //đang scroll xuống
    // scroll xuống
    header.classList.add("hide");
    
  } else { //đang scroll lên
    // scroll lên
    header.classList.remove("hide");
  }

  lastScroll = currentScroll; // sau mỗi lần scroll thì gán lại vị trí scroll mới nhất
});

//end-scrol-header