import { connectToDb } from "./database/db.js";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Project } from "./models/project.model.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Change in production
    methods: ["GET", "POST"],
  },
  path: "/socket.io/", // Ensure correct path
});

// socket.io middleware

// io.use(async (socket, next) => {
//   try {
//     const token =
//       socket.handshake.auth?.token ||
//       socket.handshake.headers.authorization?.split(" ")[1];

//       const projectId = socket.handshake.query.projectId;
//       console.log("projectId is"+projectId);

//       if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
//         return res.status(400).json({ message: "Invalid or missing projectId" });
//       }

//       socket.project = await Project.findById(projectId);

//     if (!token) {
//       return next(new Error("Authentication error"));
//     }

//     const decodedinfo = jwt.verify(token, process.env.TOKEN_SECRET);

//     if (!decodedinfo) {
//       return next(new Error("Authentication error"));
//     }

//     socket.user = decodedinfo;

//     next()
//   } catch (error) {
//     next(error);
//   }
// });

io.use(async (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.split(" ")[1];

    const projectId = socket.handshake.query.projectId;

    console.log("projectId: " + projectId);

    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error("Invalid or missing projectId"));
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return next(new Error("Project not found"));
    }

    socket.project = project;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decodedinfo = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decodedinfo) {
      return next(new Error("Authentication error"));
    }

    socket.user = decodedinfo;

    next();
  } catch (error) {
    next(error);
  }
});

io.on("connection", (socket) => {
  console.log("🟢 Socket.IO: Connection established");

  // socket.join(socket.project._id)
  if (socket.project) {
    socket.join(socket.project._id.toString());
    console.log(`🔗 Joined project room: ${socket.project._id}`);
  } else {
    console.error("❌ Project not found, cannot join room");
  }

  socket.on("project-message", (data) => {
    console.log("📨 Message received:", data);
    // socket.broadcast.to(socket.project._id).emit("project-message", data);
    io.to(socket.project._id.toString()).emit("project-message", data);
  });

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
