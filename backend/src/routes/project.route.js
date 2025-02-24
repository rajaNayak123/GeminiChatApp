import { Router } from "express";
import {
    createPorject, 
    getAllProjects,
    addUserToProject,
    getOneProject
} from "../controller/project.controller.js"
import { verifyUser } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create-project").post(verifyUser,createPorject)
router.route("/all-projects").get(verifyUser,getAllProjects)
router.route("/add-user-to-project").put(verifyUser,addUserToProject)
router.route("/getOneProject/:projectId").get(verifyUser,getOneProject)

export default router;