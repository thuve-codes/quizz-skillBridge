import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchModules } from '../api';

function ModuleList() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModules().then(setModules).catch(console.error);
  }, []);

  const firstRow = modules.slice(0, 3);
  const secondRow = modules.slice(3, 5);

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-14">
        <span role="img" aria-label="brain">🧠</span> Choose an IT Module to Start
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
        {firstRow.map((module) => (
          <ModuleCard key={module.id} module={module} navigate={navigate} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        {secondRow.map((module) => (
          <ModuleCard key={module.id} module={module} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({ module, navigate }) {
  return (
    <div className="w-full sm:w-[300px] border-2 border-blue-300 rounded-xl bg-white shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between text-center">
      <div>
        <h3 className="text-xl font-bold text-blue-900 mb-3">{module.title}</h3>
        <p className="text-gray-700">{module.description}</p>
      </div>
      <button
        onClick={() => navigate(`/quiz/${module.id}`)}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
      >
        🚀 <button className="btn-primary">Start Quiz</button>


      </button>
    </div>
  );
}

export default ModuleList;
