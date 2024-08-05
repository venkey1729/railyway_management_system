const db = require('../config/db');
const bcrypt = require('bcryptjs');

const getUserProfile = (req, res) => {
  const userId = req.user.id;

  db.query('SELECT email, role FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching user data' });
    res.json(result[0]);
  });
};

const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { email, password } = req.body;

  let updatedData = { email };

  if (password) {
    updatedData.password = await bcrypt.hash(password, 10);
  }

  db.query('UPDATE users SET ? WHERE id = ?', [updatedData, userId], (err) => {
    if (err) return res.status(500).json({ message: 'Error updating user data' });
    res.json({ message: 'User updated successfully' });
  });
};

const getUserBookings = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT 
      bookings.id as booking_id, 
      bookings.created_at, 
      trains.id as train_id, 
      trains.name as train_name, 
      trains.source, 
      trains.destination 
    FROM bookings 
    JOIN trains ON bookings.train_id = trains.id 
    WHERE bookings.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Error fetching bookings' });
    }
    res.json(results);
  });
};

module.exports = { getUserProfile, updateUserProfile,getUserBookings };
