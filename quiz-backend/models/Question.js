const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  id: { type: String, required: true },
  quiz: [quizSchema]
});

const courseSchema = new mongoose.Schema({
  modules: [moduleSchema]
});

module.exports = mongoose.model('Course', courseSchema);
