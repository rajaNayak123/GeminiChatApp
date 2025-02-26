import { connectToDb } from "./database/db.js";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Change in production
    methods: ["GET", "POST"],
  },
  path: "/socket.io/", // Ensure correct path
});

// socket.io middleware
io.use(async (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decodedinfo = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decodedinfo) {
      return next(new Error("Authentication error"));
    }

    socket.user = decodedinfo;

    next()
  } catch (error) {
    next(error);
  }
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

connectToDb()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("server connection error: " + error);
  });
