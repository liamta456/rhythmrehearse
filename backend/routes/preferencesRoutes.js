const express = require('express');
const router = express.Router();
const { getUser, changeCoolValue } = require('../controllers/preferencesControllers');

router.route('/')
    .get(getUser)
    .patch(changeCoolValue);

module.exports = router;