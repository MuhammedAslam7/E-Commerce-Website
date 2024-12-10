import express from "express";
import {
  addAddress,
  addToCart,
  cartItems,
  changePassword,
  deleteAddress,
  getAddress,
  productPage,
  profileDetails,
  updateAddress,
  updateProfile,
  userHome,
} from "../controllers/userController.js";
import { verifyRole, verifyToken } from "../middewares/jwt-verify.js";
import { getProductById } from "../controllers/productController.js";
const router = express.Router();

router.get("/home", verifyToken, userHome);
router.get("/product-details/:id", verifyToken, getProductById);
router.get("/product-page", verifyToken, productPage);
router.post("/add-to-cart", verifyToken, addToCart);
router.get("/cart", verifyToken, cartItems);
router.post("/add-address", verifyToken, addAddress);
router.get("/address", verifyToken, getAddress);
router.patch("/update-address", verifyToken, updateAddress);
router.delete("/delete-address", verifyToken, deleteAddress);
router.post("/change-password", verifyToken, changePassword);
router.get("/profile-details", verifyToken, profileDetails);
router.patch("/update-profile", verifyToken, updateProfile);

export default router;
