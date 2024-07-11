import express from 'express'
import authMiddleware from '../middleware/auth.js';
import { placeOrder, userOrder, verifyOrder } from '../controllers/orderController.js'


const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders", authMiddleware, userOrder);

export default orderRouter;