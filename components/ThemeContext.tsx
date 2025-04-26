// src/components/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  darkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true) // Default to dark mode

  useEffect(() => {
    // Apply the theme to the body when component mounts or theme changes
    document.body.classList.toggle("dark-theme", darkMode)
    document.body.classList.toggle("light-theme", !darkMode)
  }, [darkMode])

  const toggleTheme = (): void => {
    setDarkMode(!darkMode)
    // Could save preference to storage if needed
    // chrome.storage.local.set({ darkMode: !darkMode });
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
