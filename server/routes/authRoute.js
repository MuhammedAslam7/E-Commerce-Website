import express from "express";
import {
  adminLogout,
  adminSignin,
  confirmPasswordReset,
  refreshToken,
  resendOTP,
  resetPassword,
  resetVerifyOTP,
  signIn,
  signup,
  verifyOTP,
} from "../controllers/authControllers.js";

const router = express.Router();
//user
router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/signin", signIn);
router.get("/refresh-token", refreshToken);
router.post("/reset-password", resetPassword);
router.post("/reset-verify-otp", resetVerifyOTP);
router.post("/confirm-reset-password", confirmPasswordReset);

//admin
router.post("/admin/signin", adminSignin);
router.post("/admin/logout", adminLogout);

export default router;
