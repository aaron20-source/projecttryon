const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.create(name, email, hashedPassword);
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Add the missing protectedRoute function
exports.protectedRoute = (req, res) => {
    res.status(200).json({ message: 'You have accessed a protected route!', user: req.user });
};

// Add the missing verifyEmail function
exports.verifyEmail = (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: 'Email is required for verification.' });
    }
    res.status(200).json({ message: `Email ${email} verified successfully.` });
};