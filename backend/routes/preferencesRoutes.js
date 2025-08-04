const express = require('express');
const router = express.Router();
const { getUser, changeCoolValue } = require('../controllers/preferencesControllers');

router
    .get('/', getUser)
    .patch('/cool', changeCoolValue);

module.exports = router;