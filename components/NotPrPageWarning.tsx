// src/components/NotPrPageWarning.tsx
import React from "react"

import StarOnGithubBtn from "./StarOnGithubBtn"

const NotPrPageWarning: React.FC = () => {
  return (
    <div className="flex flex-col items-center !z-10 justify-center py-8 text-center">
      <div className="bg-yellow-100 dark:bg-amber-900/30 p-6 rounded-lg mb-4 text-yellow-800 dark:text-yellow-200 max-w-md">
        <svg
          className="w-12 h-12 mx-auto mb-4 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h3 className="text-lg font-medium mb-2">
          Not a GitHub Pull Request Page
        </h3>
        <p className="text-sm">
          Please navigate to a GitHub pull request creation page to use PrGPT.
        </p>
        <div className="mt-4 flex items-center justify-center">
          <StarOnGithubBtn />
        </div>
      </div>

      <div className="mt-4 max-w-md">
        <h4 className="font-medium text-lg mb-2">How to use PrGPT:</h4>
        <ol className="text-left text-sm space-y-2 text-gray-400 dark:text-gray-400">
          <li>1. Navigate to your GitHub repository</li>
          <li>2. Click on "Pull requests" tab</li>
          <li>3. Click "New pull request"</li>
          <li>4. Select branches to compare</li>
          <li>5. Open PrGPT extension</li>
        </ol>
      </div>
    </div>
  )
}

export default NotPrPageWarning
