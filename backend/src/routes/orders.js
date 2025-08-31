const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

// Protected routes
router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

router.get('/myorders', protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
