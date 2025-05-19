// src/components/Header.tsx
import React from "react"

import { useTheme } from "./ThemeContext"

const Header: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="text-gradient font-bold text-2xl mr-2">PrGPT</div>
        <span className="text-xs text-black bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
          AI Powered
        </span>
      </div>
      <div className="flex items-center gap-2">
        {/* GitHub Profile Button */}
        <a
          href="https://github.com/Muhsin-42"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="GitHub profile">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M12 0a12 12 0 00-3.794 23.4c.6.112.82-.256.82-.574v-2.25c-3.338.726-4.042-1.61-4.042-1.61a3.182 3.182 0 00-1.34-1.758c-1.1-.748.084-.732.084-.732a2.52 2.52 0 011.836 1.24 2.548 2.548 0 003.48.996 2.548 2.548 0 01.76-1.604c-2.665-.3-5.466-1.334-5.466-5.932a4.633 4.633 0 011.236-3.212 4.303 4.303 0 01.116-3.168s1.006-.322 3.3 1.23a11.43 11.43 0 016 0c2.29-1.552 3.296-1.23 3.296-1.23a4.303 4.303 0 01.118 3.168 4.626 4.626 0 011.234 3.212c0 4.61-2.804 5.628-5.474 5.922a2.866 2.866 0 01.82 2.218v3.292c0 .32.216.692.826.574A12 12 0 0012 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Toggle theme">
          {darkMode ? (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"></path>
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
