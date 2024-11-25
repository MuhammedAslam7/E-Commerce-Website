import express from "express";
import productRouter from "./products.js";
import categoryRouter from "./categoryRoute.js";
import usersRoute from "./usersRoute.js";
import brandRouter from "./brandRoute.js";
import { verifyRole, verifyToken } from "../middewares/jwt-verify.js";
const router = express.Router();

router.use("/products", verifyToken, verifyRole(["admin"]), productRouter);
router.use("/category", verifyToken, verifyRole(["admin"]), categoryRouter);
router.use("/users", verifyToken, verifyRole(["admin"]), usersRoute);
router.use("/brands", verifyToken, verifyRole(["admin"]), brandRouter);

export default router;
