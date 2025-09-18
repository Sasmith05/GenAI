import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR phone = ? LIMIT 1',
      [emailOrPhone, emailOrPhone]
    );

    if (rows.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
