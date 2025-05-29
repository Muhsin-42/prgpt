// import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react"

import { Button } from "./ui/button"

export default function StarOnGithub() {
  return (
    <Button
      variant="default"
      className="bg-black hover:bg-gray-900 text-white font-medium !py-4 px-6 rounded-lg shadow-md hover:shadow-lg 
        transition-all duration-200 flex items-center justify-center w-48 disabled:opacity-70 disabled:cursor-not-allowed "
      size="lg">
      <a
        href="https://github.com/Muhsin-42"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
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
        Star on GitHub
      </a>
    </Button>
  )
}
