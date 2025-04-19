const pool = require('./database');

const User = {
    findByEmail: async (email) => {
        const [rows] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },
    create: async (name, email, hashedPassword) => {
        const [result] = await pool.promise().query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        return result.insertId;
    },
    // Add the missing findById method
    findById: async (id) => {
        const [rows] = await pool.promise().query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },
};

module.exports = User;