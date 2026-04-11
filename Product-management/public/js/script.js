//scroll web
document.addEventListener("DOMContentLoaded", function () {
  const lenis = new Lenis({
    duration: 0.17,      // Thời gian mượt (giảm số này thì nhanh hơn, tăng thì chậm hơn)
    easing: (t) => t,   // Hàm easing, có thể custom
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
//end-scroll-web

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

//slider
document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra xem class .home-slider có tồn tại trên trang không mới chạy
  // Điều này giúp tránh lỗi ở các trang khác không có slider
  const homeSlider = document.querySelector('.home-slider');

  if (homeSlider) {
    const swiper = new Swiper('.home-slider', {
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
});

//end-slider



// Show alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  })
}
//end-show-alert


//button-go-back
const buttonGoBack = document.querySelectorAll("[button-go-back]");
if(buttonGoBack.length > 0) {
  buttonGoBack.forEach(button => {
    button.addEventListener("click", () => {
      history.back()
    } )
  })
}
//end-button-go-back