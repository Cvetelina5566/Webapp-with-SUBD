const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Get PostgreSQL credentials from environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTable = async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
      );
    `;
    

    try {
        console.log('hfgfk');
      await pool.query(createTableQuery);
      console.log('Users table is ready!');
    } catch (err) {
      console.error('Error creating table:', err);
    }
  };
  
  // Call the function to create the table on app startup
  console.log('Nachalo');
  createTable();
  console.log('Krai');

  
// Simple route to check if the server is up
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Route to get all users from the database
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving users');
  }
});

// Route to create a new user
app.post('/users', express.json(), async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});