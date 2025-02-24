import { Router } from "express";
import { 
    registerUser,
    loginUser,
    logoutUser,
    profileUser,getAllUsers 
} from "../controller/user.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";
const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyUser,logoutUser);
router.route("/user-profile").get(verifyUser,profileUser)
router.route("/allUsers").get(verifyUser,getAllUsers)


export default router;