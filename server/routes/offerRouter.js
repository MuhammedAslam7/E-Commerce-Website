import express from "express";
import { addOffer, getProductAndCategories } from "../controllers/offerController.js";

const router = express.Router();

router.get('/categoryProducts',getProductAndCategories)
router.post("/add-offer", addOffer)

// router.get("/active", getActiveOffers);
// router.get("/products", getProductsWithOffers);

export default router;