import { connectToDb } from "./database/db.js";
import { app } from "./app.js";
import dotenv from "dotenv"
dotenv.config({path:"./.env"})

import {Server} from 'socket.io';
import http from 'http'


const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*", // Change in production
        methods: ["GET", "POST"]
    },
    path: "/socket.io/" // Ensure correct path
});

io.on("connection", (socket) => {
    console.log("🟢 Socket.IO: Connection established");

    socket.on("event", (data) => {
        console.log("📩 Received event:", data);
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected");
    });
});

connectToDb().then(()=>{
    server.listen(process.env.PORT||8000, ()=>{
        console.log(`Server listening on port ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log("server connection error: " + error);
})
