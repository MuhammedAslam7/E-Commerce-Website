import express from "express";
import productRouter from "./products.js";
import { verifyRole, verifyToken } from "../middewares/jwt-verify.js";
const router = express.Router();

router.use("/products", verifyToken, verifyRole(["admin"]), productRouter);

export default router;
