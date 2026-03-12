let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll) {
    // scroll xuống
    header.classList.add("hide");
  } else {
    // scroll lên
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});