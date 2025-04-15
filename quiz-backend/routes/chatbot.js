const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config(); // ✅ Load environment variables

// ✅ Do NOT destructure like this:
// const { HUGGINGFACE_API_KEY } = process.env.HUGGINGFACE_API_KEY;

// Use directly from process.env
router.post('/', async (req, res) => {
  const { messages } = req.body;
  const prompt = messages[messages.length - 1].content;

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
        },
      }
    );

    // Hugging Face sometimes returns plain text instead of array
    const answer = Array.isArray(response.data)
      ? response.data[0]?.generated_text
      : response.data?.generated_text || "AI could not generate a response.";

    res.json({
      choices: [
        {
          message: {
            role: "assistant",
            content: answer
          }
        }
      ]
    });
  } catch (error) {
    console.error("🔥 HuggingFace API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

module.exports = router;
