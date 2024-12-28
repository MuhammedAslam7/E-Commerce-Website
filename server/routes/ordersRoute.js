import express from "express"
import { allOrders, orderDetailsById, updateItemStatus, updateOrderStatus } from "../controllers/orderControllers.js"

const router = express.Router()


router.get("/all-orders",  allOrders)
router.get("/order-details/:id",  orderDetailsById)
router.patch("/update-order-status",  updateOrderStatus)
router.patch("/update-item-status",  updateItemStatus)



export default router