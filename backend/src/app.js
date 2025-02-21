import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser());

// import routes
import userRouter from "../src/routes/user.route.js"
// decleration routes
app.use("/users",userRouter);

export {app};