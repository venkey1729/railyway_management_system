const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users SET ?', user, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  static async findOne(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
        if (err) reject(err);
        resolve(res[0]);
      });
    });
  }
}

module.exports = User;
