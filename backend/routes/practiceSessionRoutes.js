const express = require('express');
const router = express.Router();
const { savePracticeSession, getPracticeSessionList } = require('../controllers/practiceSessionControllers');

router.route('/')
    .post(savePracticeSession)
    .get(getPracticeSessionList);

module.exports = router;