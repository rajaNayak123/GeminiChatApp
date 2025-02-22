import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser());

// import routes
import userRouter from "../src/routes/user.route.js"
import porjectRouter from "../src/routes/project.route.js"
// decleration routes
app.use("/users",userRouter);
app.use("/projects", porjectRouter);

export {app};