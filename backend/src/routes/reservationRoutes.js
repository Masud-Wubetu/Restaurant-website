const express = require('express');
const { createReservation, getMyReservations, getAllReservations, updateReservationStatus } = require('../controllers/reservationController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createReservation);
router.get('/', protect, getMyReservations);
router.get('/all', protect, adminOnly, getAllReservations);
router.put('/:id', protect, adminOnly, updateReservationStatus);

module.exports = router;
