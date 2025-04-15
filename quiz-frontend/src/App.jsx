import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import ModuleList from './components/ModuleList';
import QuizPage from './components/QuizPage';
import QuizResult from './components/QuizResult';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/modules" element={<ModuleList />} />
        <Route path="/quiz/:moduleId" element={<QuizPage />} />
        <Route path="/results/:moduleId" element={<QuizResult />} />
      </Routes>
    </div>
  );
}

export default App;
