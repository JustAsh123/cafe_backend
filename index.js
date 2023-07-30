const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Database configuration
const dbConfig = {
  host: 'db4free.net', // Replace with your actual database host
  user: 'ashmit', // Replace with your actual database user
  password: 'ASmit123', // Replace with your actual database password
  database: 'dine_and_ash', // Replace with your actual database name
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Enable CORS with minimal options
app.use(cors({
  origin: '*', // Allow all origins (*). You can replace it with the specific origin you want to allow.
}));

// Endpoint to fetch data from the database and return it in JSON format
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM menu'; // Replace 'your_table_name' with your actual table name

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      connection.query(query, (error, results) => {
        connection.release(); // Release the connection back to the pool

        if (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json(results);
        }
      });
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
