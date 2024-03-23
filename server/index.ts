import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToMongoBd } from "./db/connectToDataBase.js";
import authRouter from "./Routes/auth.router.js";
import messageRouter from "./Routes/message.router.js";
import userRouter from "./Routes/user.router.js";
import { server, app } from "./socket/socket.js";


config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/message", messageRouter);
app.use("/user", userRouter);

server.listen(3001, async () => {
    connectToMongoBd();
    console.log("server is running on port 3001");
});