import express from "express";
import { userHome } from "../controllers/userController.js";
import { verifyRole, verifyToken } from "../middewares/jwt-verify.js";
const router = express.Router();

router.use("/home", verifyToken, userHome);

export default router;
