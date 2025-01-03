import express from "express";
import { getProductAndCategories } from "../controllers/offerController.js";

const router = express.Router();

router.get('/categoryProducts',getProductAndCategories)

export default router;