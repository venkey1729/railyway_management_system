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

const updateTrain = (req, res) => {
  const { trainId, name, source, destination, seats } = req.body;

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
  const { trainId } = req.body;

  db.query('DELETE FROM trains WHERE id = ?', [trainId], (err) => {
    if (err) return res.status(500).json({ message: 'Error deleting train' });
    res.json({ message: 'Train deleted successfully' });
  });
};




const getAvailability = (req, res) => {
  const { source, destination } = req.query;
  db.query(
    'SELECT * FROM trains WHERE source = ? AND destination = ?',
    [source, destination],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching trains' });
      res.json(results);
    }
  );
};

const searchTrains = (req, res) => {
  const { source, destination } = req.query;

  db.query(
    'SELECT * FROM trains WHERE source = ? AND destination = ?',
    [source, destination],
    (err, results) => {
      if (err) {
        console.error('Error searching trains:', err);
        return res.status(500).json({ message: 'Error searching trains' });
      }
      res.json(results);
    }
  );
};
const getTrainById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM trains WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching train details' });
    res.json(result[0]);
  });
};



module.exports = { addTrain, getAvailability,deleteTrain,updateTrain,searchTrains,getTrainById};
