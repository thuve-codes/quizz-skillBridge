// routes/quiz.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Question'); // Your actual Course model

// GET all modules from all courses
router.get('/', async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.json(allCourses); // returns array of course objects (with modules)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET specific module by ID (like 'cyber-security')
router.get('/module/:id', async (req, res) => {
  try {
    const allCourses = await Course.find();
    for (const course of allCourses) {
      const module = course.modules.find(m => m.id === req.params.id);
      if (module) {
        return res.json(module);
      }
    }
    res.status(404).json({ message: 'Module not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
