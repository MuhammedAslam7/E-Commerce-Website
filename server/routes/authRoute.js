import express from "express";
import {
  refreshToken,
  resendOTP,
  signIn,
  signup,
  verifyOTP,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/signin", signIn);
router.post("/refresh-token", refreshToken);
router.post("/admin/signin", refreshToken);

export default router;
