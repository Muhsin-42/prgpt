import React from "react"

interface PrResultProps {
  onGenerate: () => void
}

const PrResult: React.FC<PrResultProps> = ({ onGenerate }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-lg p-6 mx-5 my-6 text-center border border-gray-700">
      <h2 className="text-xl font-bold mb-3 text-purple-400">
        Pull Request Created 🎉
      </h2>
      <p className="text-sm text-gray-300 mb-6">
        Your pull request has been successfully generated and placed on GitHub.
        <br />
        You can now close this extension.
      </p>

      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => window.close()}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
          Close Extension
        </button>
        {/* Regenerate Button */}
        <button
          onClick={onGenerate}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
          Regenerate PR
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-6">
        Powered by <span className="text-purple-400 font-semibold">PrGPT</span>{" "}
        🚀
      </p>
    </div>
  )
}

export default PrResult
