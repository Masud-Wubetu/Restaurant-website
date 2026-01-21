const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/', protect, getMyOrders);
router.get('/all', protect, adminOnly, getAllOrders);
router.put('/:id', protect, adminOnly, updateOrderStatus);

module.exports = router;
