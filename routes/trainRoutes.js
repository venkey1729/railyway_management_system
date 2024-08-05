const express = require('express');
const { addTrain, getAvailability,deleteTrain, updateTrain } = require('../controllers/trainController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const { searchTrains,getTrainById } = require('../controllers/trainController');
const router = express.Router();

router.post('/add', verifyToken, verifyAdmin, addTrain);
router.get('/availability', getAvailability);
router.delete('/trains/:id', deleteTrain);
router.get('/search', searchTrains);
router.get('/:id', getTrainById);
// Update a train
router.put('/trains/:id', updateTrain);

module.exports = router;
