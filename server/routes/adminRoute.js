import express from "express";
import productRouter from "./products.js";
import categoryRouter from "./categoryRoute.js";
import usersRoute from "./usersRoute.js";
import brandRouter from "./brandRoute.js";
import orderRouter from "./ordersRoute.js"
import offerRouter from './offerRouter.js'
import { verifyRole, verifyToken } from "../middewares/jwt-verify.js";
import { dashboard, salesData,} from "../controllers/salesController.js";
const router = express.Router();

router.use("/products", verifyToken, verifyRole(["admin"]), productRouter);
router.use("/category", verifyToken, verifyRole(["admin"]), categoryRouter);
router.use("/users", verifyToken, verifyRole(["admin"]), usersRoute);
router.use("/brands", verifyToken, verifyRole(["admin"]), brandRouter);
router.use("/orders", verifyToken, verifyRole(["admin"]), orderRouter);
router.use("/offers", verifyToken, verifyRole(["admin"]), offerRouter);
router.get("/dashboard", verifyToken, verifyRole(["admin"]), dashboard);
router.get("/sales-report", verifyToken, verifyRole(["admin"]), salesData);
// router.get("/sales-report/custom", verifyToken, verifyRole(["admin"]), getSalesReportData);

export default router;
