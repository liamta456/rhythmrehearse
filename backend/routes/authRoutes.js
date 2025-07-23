const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authControllers');

router
    .post('/register', register)
    .post('/login', login);
    //TODO: add logout handler and functionality

module.exports = router;