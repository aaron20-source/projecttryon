const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authMiddleware = require('./authMiddleware');

// Protected route (requires authentication)
router.post('/protected-route', authMiddleware.isAuthenticated, controller.protectedRoute);

// Public routes
router.post('/register', controller.register); // User registration
router.get('/verify-email', controller.verifyEmail); // Email verification
router.post('/login', controller.login); // User login

// Logout route (requires authentication)
router.post('/logout', authMiddleware.isAuthenticated, (req, res) => {
    try {
        // Handle logout logic (e.g., token invalidation)
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
});

module.exports = router;