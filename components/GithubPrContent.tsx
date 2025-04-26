// src/components/GithubPrContent.tsx
import React from "react"

// import GenerateButton from "./GenerateButton"
import GenerateButton from "./GenerateButton"
import PrResult from "./PrResult"

interface PrDetails {
  title: string
  description: string
}

interface GithubPrContentProps {
  isGenerated: boolean
  isLoading: boolean
  prDetails: PrDetails
  onGenerate: () => void
}

const GithubPrContent: React.FC<GithubPrContentProps> = ({
  isGenerated,
  isLoading,
  prDetails,
  onGenerate
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">GitHub Pull Request</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Generate a professional pull request title and description based on
          your commit messages.
        </p>
      </div>

      {!isGenerated ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-6 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click generate to create a pull request with AI
            </p>
          </div>
          <GenerateButton onClick={onGenerate} isLoading={isLoading} />
        </div>
      ) : (
        <PrResult prDetails={prDetails} />
      )}
    </div>
  )
}

export default GithubPrContent
