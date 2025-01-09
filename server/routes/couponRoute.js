import express from "express";
import { addCoupon } from "../controllers/couponController.js";

const router = express.Router();

router.post("/add-coupon", addCoupon);

export default router;
