const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './.env.txt' });

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Could not connect to MySQL', err);
    } else {
        console.log('Connected to MySQL');
        connection.release();
    }
});

module.exports = pool;