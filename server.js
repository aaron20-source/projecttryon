const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan'); // Import morgan
const authRoutes = require('./auth');
const pool = require('./database'); // MySQL connection pool

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev')); // Add morgan for logging HTTP requests
app.use(bodyParser.json());
app.use(cors());

// Test MySQL connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
        connection.release();
    }
});

// Mount the auth routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});