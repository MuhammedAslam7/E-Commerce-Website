import express from "express";
import { userHome } from "../controllers/userController.js";
import { verifyRole, verifyToken } from "../middewares/jwt-verify.js";
import { getProductById } from "../controllers/productController.js";
const router = express.Router();

router.get("/home", verifyToken, userHome);
router.get("/product-details/:id", verifyToken, getProductById);

export default router;
