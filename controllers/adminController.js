const db = require('../config/db');

const addTrain = (req, res) => {
    const { name, source, destination, seats } = req.body;
  
    db.query(
      'INSERT INTO trains (name, source, destination, seats) VALUES (?, ?, ?, ?)',
      [name, source, destination, seats],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Error adding train' });
        res.status(201).json({ message: 'Train added successfully', trainId: result.insertId });
      }
    );
  };

const getAllBookings = (req, res) => {
  db.query('SELECT * FROM bookings', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching bookings' });
    res.json(results);
  });
};


const getAllTrains = (req, res) => {
  db.query('SELECT * FROM trains', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching trains' });
    res.json(results);
  });
};

/*const updateTrain = (req, res) => {
  const { trainId, name, source, destination, seats } = req.body;

  db.query(
    'UPDATE trains SET name = ?, source = ?, destination = ?, seats = ? WHERE id = ?',
    [name, source, destination, seats, trainId],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error updating train' });
      res.json({ message: 'Train updated successfully' });
    }
  );
};*/

const updateTrain = (req, res) => {
  const trainId = req.params.id;  // Use req.params.id to get the train ID from the URL
  const { name, source, destination, seats } = req.body;

  db.query(
    'UPDATE trains SET name = ?, source = ?, destination = ?, seats = ? WHERE id = ?',
    [name, source, destination, seats, trainId],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error updating train' });
      res.json({ message: 'Train updated successfully' });
    }
  );
};


const deleteTrain = (req, res) => {
  //const { trainId } = req.body;
  const trainId = req.params.id;  
  db.query('DELETE FROM trains WHERE id = ?', [trainId], (err) => {
    if (err) return res.status(500).json({ message: 'Error deleting train' });
    res.json({ message: 'Train deleted successfully' });
  });
};

module.exports = {addTrain, getAllBookings, getAllTrains, updateTrain, deleteTrain };
