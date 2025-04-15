const express = require('express');
const router = express.Router();
const Result = require('../models/Results');

// POST a new quiz result
router.post('/', async (req, res) => {
  try {
    const { userId, moduleId, score, totalQuestions, correctAnswers } = req.body;

    const newResult = new Result({
      userId,
      moduleId,
      score,
      totalQuestions,
      correctAnswers
    });

    await newResult.save();
    res.status(201).json(newResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all results (optional)
router.get('/', async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET results by userId (optional)
router.get('/:userId', async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
