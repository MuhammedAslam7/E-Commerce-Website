import express from "express";
import { addOffer, getOffers, getProductAndCategories } from "../controllers/offerController.js";

const router = express.Router();


router.get("/all-offers", getOffers )
router.get('/categoryProducts',getProductAndCategories)
router.post("/add-offer", addOffer)

export default router;