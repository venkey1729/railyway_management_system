// bookingController.js
const db = require('../config/db');

const bookSeat = (req, res) => {
  const { train_id } = req.body;
  const user_id = req.user.id;

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ message: 'Transaction error' });

    db.query('SELECT seats FROM trains WHERE id = ? FOR UPDATE', [train_id], (err, results) => {
      if (err) {
        db.rollback();
        return res.status(500).json({ message: 'Error fetching train' });
      }

      const availableSeats = results[0].seats;
      if (availableSeats <= 0) {
        db.rollback();
        return res.status(400).json({ message: 'No seats available' });
      }

      db.query('UPDATE trains SET seats = seats - 1 WHERE id = ?', [train_id], (err) => {
        if (err) {
          db.rollback();
          return res.status(500).json({ message: 'Error booking seat' });
        }

        db.query('INSERT INTO bookings (train_id, user_id) VALUES (?, ?)', [train_id, user_id], (err, result) => {
          if (err) {
            db.rollback();
            return res.status(500).json({ message: 'Error creating booking' });
          }

          db.commit((err) => {
            if (err) {
              db.rollback();
              return res.status(500).json({ message: 'Transaction error' });
            }
            res.json({ message: 'Seat booked successfully', booking_id: result.insertId });
          });
        });
      });
    });
  });
};


const deleteBooking = (req, res) => {
  const { booking_id } = req.params;

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ message: 'Transaction error' });

    // Find the booking and associated train
    db.query('SELECT * FROM bookings WHERE id = ?', [booking_id], (err, bookingResults) => {
      if (err || bookingResults.length === 0) {
        db.rollback();
        return res.status(404).json({ message: 'Booking not found' });
      }

      const booking = bookingResults[0];

      // Delete the booking
      db.query('DELETE FROM bookings WHERE id = ?', [booking_id], (err) => {
        if (err) {
          db.rollback();
          return res.status(500).json({ message: 'Error deleting booking' });
        }

        // Increment the available seats for the train
        db.query('UPDATE trains SET seats = seats + 1 WHERE id = ?', [booking.train_id], (err) => {
          if (err) {
            db.rollback();
            return res.status(500).json({ message: 'Error updating train seats' });
          }

          db.commit((err) => {
            if (err) {
              db.rollback();
              return res.status(500).json({ message: 'Transaction error' });
            }
            res.json({ message: 'Booking cancelled successfully' });
          });
        });
      });
    });
  });
};

module.exports = { bookSeat, deleteBooking };

