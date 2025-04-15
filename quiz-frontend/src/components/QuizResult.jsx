import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { submitResult, getAIResponse } from '../api';

function QuizResult() {
  const { moduleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { score = 0, total = 0 } = location.state || {};
  const percentage = Math.round((score / total) * 100);

  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm your AI assistant. Ask me anything about the "${moduleId}" module.`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userId = 'student123'; // Replace with actual user logic later
    submitResult({
      userId,
      moduleId,
      score,
      totalQuestions: total,
      correctAnswers: score,
    }).catch(console.error);
  }, [moduleId, score, total]);

  const handleSend = async () => {
    if (!chatInput.trim()) return;

    const updatedMessages = [...chatMessages, { role: 'user', content: chatInput }];
    setChatMessages(updatedMessages);
    setChatInput('');
    setIsLoading(true);

    try {
      const res = await getAIResponse(updatedMessages);
      const reply = res.choices[0].message.content;
      setChatMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I couldn't process your question. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 bg-blue-50 min-h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">{moduleId.toUpperCase()} - Quiz Results</h2>
      <div className="text-xl text-gray-800 mb-2">
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </div>
      <div
        className={`text-2xl font-bold ${percentage >= 45 ? 'text-green-600' : 'text-red-600'} mb-8`}
      >
        {percentage}% {percentage >= 45 ? '✔️ Passed' : '❌ Try Again'}
      </div>

      {percentage < 45 && (
        <button
          onClick={() => navigate(`/quiz/${moduleId}`)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md"
        >
          🔄 Retake Quiz
        </button>
      )}

      <button
        onClick={() => navigate('/modules')}
        className="mt-4 text-blue-700 underline hover:text-blue-900"
      >
        ← Back to Modules
      </button>

      {/* ✅ Chatbot Section */}
      <div className="mt-12 w-full max-w-2xl bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2 text-blue-800">💬 Ask AI about this Module</h3>
        <div className="h-64 overflow-y-auto border p-3 rounded bg-gray-50 text-left">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
          {isLoading && <div className="text-sm text-gray-500">AI is typing...</div>}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 border border-gray-300 rounded-l px-4 py-2 outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizResult;
