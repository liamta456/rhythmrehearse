const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authControllers');

router.route('/register').post(register);

module.exports = router;