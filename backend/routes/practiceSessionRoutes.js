const express = require('express');
const router = express.Router();
const { savePracticeSession, getPracticeSessionList, getPracticeSession, updatePracticeSession, deletePracticeSession } = require('../controllers/practiceSessionControllers');

router.route('/')
    .post(savePracticeSession)
    .get(getPracticeSessionList);

router.route('/:id')
    .get(getPracticeSession)
    .patch(updatePracticeSession)
    .delete(deletePracticeSession);

module.exports = router;