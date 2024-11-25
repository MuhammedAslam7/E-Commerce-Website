import express from "express";
import {
  addBrand,
  allBrands,
  updateBrandStatus,
} from "../controllers/brandController.js";

const router = express.Router();

router.post("/add-brand", addBrand);
router.get("/all-brands", allBrands);
router.patch("/update-status/:id", updateBrandStatus);

export default router;
