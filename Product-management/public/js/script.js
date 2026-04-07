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