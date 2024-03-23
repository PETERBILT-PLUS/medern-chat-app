import { Server } from "socket.io";
import http from "http";
import express from "express";

export const app = express();

export const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});

const userSocket: { [key: string]: string } = {};

io.on("connected", (socket) => {
    console.log("a user is enter" + socket.id);
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocket[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSocket));
    socket.on("disconnected", () => {
        console.log("user is disconnected" + socket.id);
        delete userSocket[userId]
        io.emit("getOnlineUsers", Object.keys(userSocket));    
    });
});
