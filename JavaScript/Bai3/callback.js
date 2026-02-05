const task1 = () => {
    console.log("việc 1");
}

const task2 = (callback) => {
    console.log("việc 2");
    callback();
}


task2(task1)

// callback là hàm truyền vào đối số của hàm khác