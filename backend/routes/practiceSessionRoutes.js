const express = require('express');
const router = express.Router();
const { savePracticeSession } = require('../controllers/practiceSessionControllers');

router.post('/', savePracticeSession);

module.exports = router;