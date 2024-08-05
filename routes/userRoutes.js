const express = require('express');
const { getUserProfile, updateUserProfile,getUserBookings } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
//router.get('/bookings', verifyToken, getUserBookings);
router.get('/bookings', verifyToken, getUserBookings);
module.exports = router;
