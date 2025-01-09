import express from "express";
import { addCoupon, allCoupons } from "../controllers/couponController.js";

const router = express.Router();

router.post("/add-coupon", addCoupon);
router.get("/all-coupons", allCoupons)

export default router;
