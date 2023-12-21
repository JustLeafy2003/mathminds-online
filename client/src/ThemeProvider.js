/**
 * Theme provider to manage and provide dark/light theme settings.
 * @module ThemeProvider
 * @type {function}
 * @returns {JSX.Element} - React context provider for themes.
 */
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();
/**
 * ThemeProvider functional component.
 * @param {object} props - React component props.
 * @param {JSX.Element} props.children - Child components wrapped by the ThemeProvider.
 * @returns {JSX.Element} - React context provider for themes.
 */
export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  /**
   * Toggle the current theme between dark and light.
   * @function
   */
  const toggleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  };

  /**
   * Load the theme preference from localStorage (if available).
   * @function
   */
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkTheme(storedTheme === "dark");
    }
  }, []);

  /**
   * Save the theme preference to localStorage.
   * @function
   */
  useEffect(() => {
    localStorage.setItem("theme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
/**
 * Custom hook to consume the theme context.
 * @function
 * @returns {object} - Theme context values.
 */
export function useTheme() {
  return useContext(ThemeContext);
}
