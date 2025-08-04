const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authControllers');

router
    .post('/register', register)
    .post('/login', login);

module.exports = router;