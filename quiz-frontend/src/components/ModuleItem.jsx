"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Clock, Award, Users, ArrowRight } from "lucide-react"

function ModuleItem({ module }) {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate completion percentage (assuming module has completionRate property)
  const completionRate = module.completionRate || 0

  return (
    <Link
      to={`/quiz/${module.id}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Start ${module.title} quiz`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <div
            className={`text-4xl mb-4 p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
          >
            {module.icon}
          </div>

          {/* Badge - could show difficulty or category */}
          {module.category && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              {module.category}
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {module.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4">{module.description}</p>

        {/* Module stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{module.duration || "10 mins"}</span>
          </div>
          <div className="flex items-center">
            <Award className="w-4 h-4 mr-1" />
            <span>{module.points || "100"} pts</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{module.participants || "120"}</span>
          </div>
        </div>

        {/* Progress bar */}
        {completionRate > 0 && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionRate}%` }}
              aria-valuenow={completionRate}
              aria-valuemin="0"
              aria-valuemax="100"
              role="progressbar"
            ></div>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <div className="text-blue-600 dark:text-blue-400 font-medium flex items-center group-hover:font-bold transition-all">
            <span>Start Quiz</span>
            <ArrowRight
              className={`w-5 h-5 ml-1 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
            />
          </div>

          {/* Optional: Show a badge for new or popular modules */}
          {module.isNew && (
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-200">
              NEW
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ModuleItem
