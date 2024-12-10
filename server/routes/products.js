import express from "express";
import {
  addProduct,
  addVariants,
  editProduct,
  getAllProducts,
  getProductById,
  updateProductStatus,
} from "../controllers/productController.js";
const router = express.Router();

router.post("/add-products", addProduct);
router.patch("/add-variants/:productId", addVariants);
router.get("/all-products", getAllProducts);
router.patch("/update-status/:id", updateProductStatus);
router.get("/get-product/:id", getProductById);
router.put("/edit-product/:id", editProduct);

export default router;
