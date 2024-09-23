const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for Angular frontend
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (e.g., images)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Open SQLite database
const db = new sqlite3.Database('shops.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// API endpoint to get all shop data
app.get('/api/shops', (req, res) => {
  db.all('SELECT * FROM shops', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// API endpoint to get shop data by ID
app.get('/api/shops/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM shops WHERE id = ?', [id], (err, row) => {
    if (err) {
      throw err;
    }
    res.json(row);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
