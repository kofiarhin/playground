const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// setup middiewrae

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let messages = [];
io.on("connection", (socket) => {
  io.emit("receive_message", messages);

  socket.on("join", (data) => {
    socket.broadcast.emit("new_user", data);
  });

  socket.on("leave", (data) => {
    socket.broadcast.emit("user_left", data);
  });
  socket.on("send_message", (data) => {
    messages.push(data);
    io.emit("receive_message", messages);
  });
});

app.get("*", (req, res) => {
  return res.json("hello World");
});

server.listen(5000, () => console.log("server started"));
