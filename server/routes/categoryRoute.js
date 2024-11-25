import express from "express";
import {
  addCategory,
  allCategories,
  updateCategoryStatus,
} from "../controllers/categoryController.js";
const router = express.Router();

router.post("/add-category", addCategory);
router.get("/all-categories", allCategories);
router.patch("/update-status/:id", updateCategoryStatus);

export default router;
