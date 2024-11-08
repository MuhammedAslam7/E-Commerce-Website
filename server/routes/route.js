import express from "express";
import authRouter from "./authRoute.js";
const router = express.Router();

router.use("/auth", authRouter);
// router.use("/user");

export { router };
