const express = require('express');
const { bookSeat,deleteBooking } = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/book', verifyToken, bookSeat);
router.delete('/cancel/:booking_id', verifyToken, deleteBooking);

module.exports = router;
