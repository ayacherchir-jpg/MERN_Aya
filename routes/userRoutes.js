const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers,
    updateUserPassword,
    updateUserRole
} = require('../controllers/userController');

const {
    protect,
    adminOnly
} = require('../middlewares/authMiddleware');

// Routes d'authentification publiques
router.post('/register', registerUser);
router.post('/login', loginUser);

// Route privée protégée par Token JWT
router.get('/profile', protect, getUserProfile);

// Route réservée aux administrateurs (JWT valide + rôle admin requis)
router.get('/', protect, adminOnly, getAllUsers);
router.put('/update-password', protect, updateUserPassword);
router.put('/role/:id', protect, adminOnly, updateUserRole);

module.exports = router;