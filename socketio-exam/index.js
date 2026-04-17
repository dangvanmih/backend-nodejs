const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('SERVER_SEND_SOCKET_ID', socket.id);


  socket.on('CLIENT_SEND_MESSAGE', (data) => {
    // Khi A gửi data lên server, server chỉ trả về cho A
    // ví dụ: Khi A gửi tin nhắn nhưng bị lỗi thì server chỉ trả về thông báo lỗi cho A thôi.
    // socket.emit('SERVER_RETURN_MESSAGE', data);



    // Khi A gửi data lên server, server trả về cho cả A, B , C...
    // ví dụ: Tin nhắn chat trong group
    io.emit('SERVER_RETURN_MESSAGE', data);


    // Khi A gửi data lên server, server trả về cho cả  B , C không trả về cho A
    // ví dụ: Typing... (dấu 3 chấm khi ông A đang soạn tin nhắn thì chỉ có ông B , C nhìn thấy còn ông A thì không)
    // socket.broadcast.emit('SERVER_RETURN_MESSAGE', data);

  });


});


server.listen(3000, () => {
  console.log('listening on *:3000');
});