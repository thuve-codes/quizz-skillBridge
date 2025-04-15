import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../api';

function QuizPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [module, setModule] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchQuestions(moduleId)
      .then((data) => setModule(data))
      .catch(console.error);
  }, [moduleId]);

  if (!module) {
    return <div className="p-10 text-gray-700">Loading...</div>;
  }

  const questions = module.quiz;
  const currentQ = questions[current];

  const handleNext = () => {
    if (selected === currentQ.answer) setScore(score + 1);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      navigate(`/results/${module.id}`, {
        state: {
          score: selected === currentQ.answer ? score + 1 : score,
          total: questions.length,
        },
      });
    }
  };

  return (
    <div className="p-8 min-h-screen bg-white max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        {module.title} Quiz — Question {current + 1} of {questions.length}
      </h2>

      <div className="mb-6">
        <p className="text-lg font-semibold mb-4">{currentQ.question}</p>
        <div className="space-y-3">
          {currentQ.options.map((opt, i) => (
            <label
              key={i}
              className={`block border px-4 py-2 rounded cursor-pointer ${
                selected === opt
                  ? 'bg-blue-100 border-blue-600'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <input
                type="radio"
                name="option"
                className="mr-2"
                checked={selected === opt}
                onChange={() => setSelected(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!selected}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded disabled:opacity-50"
      >
        {current === questions.length - 1 ? 'Submit Quiz' : 'Next'}
      </button>
    </div>
  );
}

export default QuizPage;
