import express from 'express';
import { createOrder, getAllOrders,confirmPayment,getOrderById,getOrders,updateAnyOrder,updateOrder } from '../contollers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();
orderRouter.get('/getall',getAllOrders);
orderRouter.put('/getall/:id',updateAnyOrder);

//PROTECTED ROUTES
orderRouter.use(authMiddleware);

orderRouter.post('/', createOrder);
orderRouter.get('/', getOrders);
orderRouter.get('/confirm', confirmPayment);
orderRouter.get('/:id', getOrderById);
orderRouter.put('/:id', updateOrder);

export default orderRouter;
