import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import TempUser from "../model/tempUserModel.js";
import { generateOTP, sendOTPEmail } from "../utils/otp.js";
import { createAccessToken, createRefreshToken } from "../utils/jwt-token.js";

export const signup = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    //
    const existTemp = await TempUser.findOne({ email });
    if (existTemp) {
      return res.status(409).json({ message: "Retry after 2 minute" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({ message: "User already Exist" });
    }
    //otp generation
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 60000); // expire in 1 minut

    const hashedPassword = await bcryptjs.hash(password, 10);

    const tempUser = new TempUser({
      username,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpires,
    });
    await tempUser.save();
    //sending otp
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP Send to Email" });
  } catch (error) {
    res.status(500).json({ message: "Error in Signup", error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otpValue } = req.body;

    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    if (tempUser.otp != otpValue) {
      console.log("otp error");
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (tempUser.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP Expired" });
    }

    //creating user after otp verified
    const newUser = new User({
      username: tempUser.username,
      email: tempUser.email,
      phone: tempUser.phone,
      password: tempUser.password,
    });

    await newUser.save();
    //delete temporay user
    await tempUser.deleteOne({ email });
    res.status(200).json({ message: "User registered Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in OTP verification", error: error.message });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    let tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return res
        .status(404)
        .json({ message: "User not found please register again" });
    }

    const newOTP = generateOTP();
    const newOTPExpires = new Date(Date.now() + 60000);
    const newTempUser = new TempUser({
      username: tempUser.username,
      email: tempUser.email,
      phone: tempUser.phone,
      password: tempUser.password,
      otp: newOTP,
      otpExpires: newOTPExpires,
    });

    const tempUserId = tempUser._id;
    await TempUser.findByIdAndDelete(tempUserId);

    console.log("Hii");
    await newTempUser.save();

    await sendOTPEmail(email, newOTP);

    res.status(200).json({ message: "New OTP send successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error resending OTP", error: error.message });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not exist" });
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    // creating token
    const refreshToken = createRefreshToken(user);
    const accessToken = createAccessToken(user);

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 24 * 1000, // 1 day
      })
      .json({
        success: true,
        message: "You are logged in ",
        data: {
          user: { id: user._id, email: user.email, role: user.role },
          accessToken,
        },
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  console.log("Hii");

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const accessToken = createAccessToken({ _id: decoded.userId });
    console.log(accessToken);
    res.json({ accessToken });
  } catch (error) {
    res
      .status(403)
      .json({ message: "Invalid refresh token", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged Out Successfully" });
};
