import React from 'react';
import { useNavigate } from 'react-router-dom';
import skillbridgeLogo from '../assets/skillbridge.png'; // adjust the path as needed


function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center">
        <div className="flex flex-col items-center gap-4">
        <div className="w-0 h-0 mb-2">
        <img src={skillbridgeLogo} alt="SkillBridge Logo"/>
        </div>


          <h1 className="text-4xl font-bold text-blue-800">
            Welcome to <span className="text-blue-600">IT Quiz Forum</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-md">
            Sharpen your skills with quizzes on Web Development, Networking, Cybersecurity, and more. Ready to challenge yourself?
          </p>

          <button
            onClick={() => navigate('/modules')}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl text-lg transition duration-300 transform hover:scale-105"
          >
            🚀 Start the Journey
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
