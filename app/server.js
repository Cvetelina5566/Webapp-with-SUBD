
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://Cvetelina Petkova:556689Tin@_@localhost:5432/mydb'
});

pool.connect()
  .then(() => console.log('Connected to the PostgreSQL database'))
  .catch((err) => console.error('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
