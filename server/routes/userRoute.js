import express from "express";
import { userHome } from "../controllers/userController.js";
const router = express.Router();

router.use("/home", userHome);

export default router;
