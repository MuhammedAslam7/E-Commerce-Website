import express from "express";
import { upload } from "../middewares/multer.js";
import { addProduct } from "../controllers/productController.js";
const router = express.Router();

router.post("/add-product", upload.array("images", 3), addProduct);

export default router;
