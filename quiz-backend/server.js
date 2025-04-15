const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // ✅ Load env variables early

const app = express(); // ✅ Define app before using it

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const quizRoutes = require('./routes/quiz');
const resultRoutes = require('./routes/result');
const chatbotRoute = require('./routes/chatbot'); // ✅ move require here

app.use('/api/quiz', quizRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/chatbot', chatbotRoute); // ✅ now this works

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
