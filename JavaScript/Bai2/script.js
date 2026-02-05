// var result = prompt("Nhập n");
// console.log(result);


// setTimeout(
//     function test() {
//         console.log("in ra sau 3s");

//     }, 3000);


// setInterval(
//     function test() {
//         console.log("in ra sau 1s và lặp lại nhiều lần");
        
//     },1000)

// 1. typeOf
// var a = 10;
// typeof(a) == "number" ? console.log("Đúng") : console.log("Sai");

// 2. làm việc với string
// var fullName = "Le Van A";
// console.log(fullName.length);

// // 3. indexOf: trả về vị trí đầu tiên của một kí tự trong chuỗi
// var mySring = "a b c d e f"
// console.log(mySring.indexOf("b"));

// // 4. lastIndexOf: trả về vị trí cuối cùng của một kí tự trong chuỗi
// var mySring = "a b c d e f b c"
// console.log(mySring.lastIndexOf("b"));

// // 5. slice: cắt chuỗi
// var mySring = "a b c d e f b c"
// console.log(mySring.slice(0,6));

// 6. replace
// var mySring = "a b c d e f b c"
// console.log(mySring.replace("c", "3"));
// console.log(mySring.replace(/b/g, "4")); // thay thế tất cả

// 7. hàm trim: cắt bỏ khoảng trắng ở hai đầu
// 8. hàm charAt: lấy kí tự thông qua index

// 9. hàm split: chuyển chuỗi thành mảng;
// var mySring = "html, css, js ,react";
// console.log(mySring.split(", ")); // mỗi từ là 1 phần tử trong mảng

// 10. hàm toString: chuyển số thành string // chuyển array thành string
// var a = 10
// var b = a.toString();
// console.log(typeof(b));
// var mySring = ["html", "css", "js" ,"react"]
// console.log(mySring.toString());


// 11. toFixed(): hàm làm tròn số thập phân
// var a = 12.3456
// console.log(a.toFixed(2)); // lấy 2 số sau số thập phân

// 12. hàm join(); hàm thêm kí tự để ngăn cách giữa các phần tử
// var mySring = ["html", "css", "js" ,"react"];
// console.log(mySring.join("-"));

// 13. pop()/push(): xóa/ thêm phần tử cuối mảng
// 14. shift(): xóa và trả về phần tử đầu mảng
    // unshift(): thêm phần tử vào đầu mảng và trả về độ dài mới của mảng.
// 15. hàm concat(): nối 2 array
// 16. hàm for in for of: cấu trúc: for (var item in/of tên mảng): lặp qua từng phần tử để thực hiện làm gì đó

// 17. tham chiếu tham trị
// function change(x, y) {
//   x = 100;
//   y.value = 200;
// }

// let a = 10;
// let b = { value: 20 };

// change(a, b);

// console.log(a);        // 10  (tham trị)
// console.log(b.value); // 200 (tham chiếu)
// ❌ Kiểu nguyên thủy → Tham trị

// ✅ Object / Array → Tham chiếu
// 14