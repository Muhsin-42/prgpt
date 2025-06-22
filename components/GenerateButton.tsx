// src/components/GenerateButton.tsx
import React from "react"

interface GenerateButtonProps {
  onClick: () => void
  isLoading: boolean
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  onClick,
  isLoading
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="bg-gradient-to-r !z-50 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
                text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg 
                transition-all duration-200 flex items-center justify-center w-48
                disabled:opacity-70 disabled:cursor-not-allowed"
      aria-label="Generate PR content">
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="flex items-center">
          <svg
            className="mr-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clipRule="evenodd"></path>
          </svg>
          Generate PR
        </span>
      )}
    </button>
  )
}

export default GenerateButton
