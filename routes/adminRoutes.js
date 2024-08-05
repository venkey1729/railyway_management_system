const express = require('express');
const { addTrain,getAllBookings, getAllTrains, updateTrain, deleteTrain } = require('../controllers/adminController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/bookings', verifyToken, verifyAdmin, getAllBookings);
router.get('/trains', verifyToken, verifyAdmin, getAllTrains);
router.put('/trains/:id', verifyToken, verifyAdmin, updateTrain);
router.delete('/trains/:id', verifyToken, verifyAdmin, deleteTrain);
router.post('/trains', verifyToken, verifyAdmin, addTrain); 

module.exports = router;
