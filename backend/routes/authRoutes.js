const express = require('express');
const { register, login,getAllUsers } = require('../controller/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);

module.exports = router;
