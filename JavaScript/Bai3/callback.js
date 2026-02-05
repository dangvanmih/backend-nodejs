// const task1 = () => {
//     console.log("việc 1");
// }

// const task2 = (callback) => {
//     console.log("việc 2");
//     callback();
// }


// task2(task1)

// callback là hàm truyền vào đối số của hàm khác

// ví dụ 3
const loginSuccess = () => {
    console.log("đăng nhập thành công");
}
const checkLogin = (data,  callback) => {
    const email = "minh123@gmail.com";
    const pass = "12345";

    if(data.email === email && data.pass === pass)
    {
        
        callback(); // gọi hàm callback
    }
    else {
        console.log("login thất baại");
        
    }
}   
let data = {
    email: "minh123@gmail.com",
    pass: "12345"
}

checkLogin(data, loginSuccess) // truyền hàm callback


// 1.spread syntax : là cú pháp trải ra các phần tử của mảng ví dụ ...array
// 2.rest parameters: tham số còn lại
// ví dụ:
// const test = (num1, num2,num3, ...numOther) => {
//     console.log(num1);
//     console.log(num2);
//     console.log(num3);
//     console.log(numOther); // là các số còn lại
    
// }
// test(1,2,3,4,5,6,7,8)

// 3. Destructuring: phá vỡ cấu trúc để dễ dàng lấy các phần tử của mảng hoặc object
// ví dụ: 
// const array = [1,2,3]
// const {a,b} = array;
// console.log(a); //a=1
// console.log(b); //b=2

