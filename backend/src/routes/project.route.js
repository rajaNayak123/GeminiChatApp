import { Router } from "express";
import {createPorject} from "../controller/project.controller.js"
import { verifyUser } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/project").post(verifyUser,createPorject)

export default router;