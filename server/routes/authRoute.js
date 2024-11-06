import express from "express";
import {
  resendOTP,
  signup,
  verifyOTP,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);

export default router;
