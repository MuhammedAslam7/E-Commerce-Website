import express from "express";
import { upload } from "../middewares/multer.js";
import {
  addProduct,
  editProduct,
  getAllProducts,
  getProductById,
  updateProductStatus,
} from "../controllers/productController.js";
const router = express.Router();

router.post("/add-products", upload.array("images", 5), addProduct);
router.get("/all-products", getAllProducts);
router.patch("/update-status/:id", updateProductStatus);
router.get("/get-product/:id", getProductById);
router.put("/edit-product/:id", upload.array("images", 5), editProduct);

export default router;
