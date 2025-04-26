// src/components/LoadingOverlay.tsx
import React from "react"

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center">
        <div className="relative w-20 h-20 mb-4">
          <div className="relative size-full rounded-full bg-gradient-to-b from-[#ba42ff] via-[#ba42ff] to-[#00e1ff] animate-spin blur-sm shadow-[0_-5px_20px_#ba42ff,0_5px_20px_#00e1ff]">
            <div className="absolute inset-0 m-auto size-full rounded-full bg-gray-200 dark:bg-gray-700 blur-[10px]"></div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
            Generating PR Content
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Analyzing commit messages with AI...
          </p>
        </div>

        <div className="mt-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div className="bg-blue-500 h-1.5 rounded-full animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay
