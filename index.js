const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("./public"));

app.get("/",(req,res) => {
    return res.sendFile("index.html");
});

io.on("connection",(socket) => {
    console.log("a user connected",socket.id);
    socket.on("disconnect",() => console.log("User disconnected"));
    socket.on("chat message", msg => {
        console.log("message "+msg);
        io.emit("chat message",msg);
    });
});

server.listen(9000, () => console.log("server started at port 9000"));