"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.scss";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Get current theme from document attribute (set by layout script)
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";
    setIsDark(currentTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);

    // Save to localStorage
    localStorage.setItem("theme", newTheme);

    // Apply theme
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
