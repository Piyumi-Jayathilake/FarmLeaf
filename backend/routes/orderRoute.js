import express from 'express';
import { createOrder, getAllOrders, confirmPayment, getOrderById, getOrders, updateAnyOrder, updateOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

// Public routes (no auth required)
orderRouter.get('/getall', getAllOrders);
orderRouter.put('/getall/:id', updateAnyOrder);

// Payment confirmation can work with or without auth
orderRouter.post('/confirm', confirmPayment);
orderRouter.get('/confirm', confirmPayment);

// Protected routes (auth required)
orderRouter.use(authMiddleware);
orderRouter.post('/', createOrder);
orderRouter.get('/', getOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.put('/:id', updateOrder);

export default orderRouter;
