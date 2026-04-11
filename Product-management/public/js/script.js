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

//btn - minus plus quantity
// Chọn tất cả các cart-item
const cartItems = document.querySelectorAll(".cart-item");

if (cartItems.length > 0) {
  cartItems.forEach((item) => {
    const btnPlus = item.querySelector(".btn-plus");
    const btnMinus = item.querySelector(".btn-minus");
    const inputQty = item.querySelector(".quantity-input");

    btnPlus.addEventListener("click", () => {
      let currentQty = parseInt(inputQty.value);
      const maxQty = parseInt(inputQty.getAttribute("max"));

      if (currentQty < maxQty) {
        inputQty.value = currentQty + 1;
        // Sau này bạn sẽ thêm logic gửi API cập nhật giỏ hàng tại đây
      }
    });

    btnMinus.addEventListener("click", () => {
      let currentQty = parseInt(inputQty.value);
      if (currentQty > 1) {
        inputQty.value = currentQty - 1;
        // Sau này bạn sẽ thêm logic gửi API cập nhật giỏ hàng tại đây
      }
    });

    // Xử lý thêm trường hợp người dùng tự nhập số vào ô input
    inputQty.addEventListener("change", (e) => {
      const maxQty = parseInt(inputQty.getAttribute("max"));
      let value = parseInt(e.target.value);

      if (value > maxQty) e.target.value = maxQty;
      if (value < 1 || isNaN(value)) e.target.value = 1;
    });
  });
}
//end-btn - minus plus quantity

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
