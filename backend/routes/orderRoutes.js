import express from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', protect, admin, getOrders);
router.put('/:id/status', protect, admin, updateOrderStatus); // new route

export default router;