//btn - minus plus quantity
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
        const product_id = inputQty.getAttribute("product_id");
        const quantity = inputQty.value;

        window.location.href = `/cart/update/${product_id}/${quantity}`;
      }
    });

    btnMinus.addEventListener("click", () => {
      let currentQty = parseInt(inputQty.value);
      if (currentQty > 1) {
        inputQty.value = currentQty - 1;
        const product_id = inputQty.getAttribute("product_id");
        const quantity = inputQty.value;

        window.location.href = `/cart/update/${product_id}/${quantity}`;
      }
    });


    // Xử lý trường hợp người dùng tự nhập số vào ô input
    inputQty.addEventListener("change", (e) => {
      const product_id = inputQty.getAttribute("product_id");
      const maxQty = parseInt(inputQty.getAttribute("max"));
      let value = parseInt(e.target.value);

      // 1. Kiểm tra tính hợp lệ của giá trị nhập vào
      if (isNaN(value) || value < 1) {
        value = 1;
      } else if (value > maxQty) {
        value = maxQty;
      }

      e.target.value = value;

      window.location.href = `/cart/update/${product_id}/${value}`;
    });
  }
  )
}
//end-btn - minus plus quantity