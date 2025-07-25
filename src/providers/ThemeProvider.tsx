"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";

type ThemeType = "light" | "dark";

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  accent: string;
}

interface FontSizes {
  small: string;
  medium: string;
  large: string;
}

interface Theme {
  colors: ThemeColors;
  fontSizes: FontSizes;
}

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  currentTheme: Theme;
}

const lightTheme: Theme = {
  colors: {
    primary: "#83C5BE",
    secondary: "#F0B67F",
    background: "#FFFCFF",
    surface: "#83C5BE",
    text: "#28282B",
    accent: "#EF3054",
  },
  fontSizes: {
    small: "14px",
    medium: "16px",
    large: "24px",
  },
};

const darkTheme: Theme = {
  colors: {
    primary: "#3F3047",
    secondary: "#F0B67F",
    background: "#28282B",
    surface: "#3F3047",
    text: "#FFFCFF",
    accent: "#EF3054",
  },
  fontSizes: {
    small: "14px",
    medium: "16px",
    large: "24px",
  },
};

const themes: Record<ThemeType, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export { ThemeContext };

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeType>("light");

  const currentTheme = themes[theme];

  // Apply CSS custom properties to document root for smooth transitions
  useEffect(() => {
    const root = document.documentElement;
    
    // Set CSS custom properties
    root.style.setProperty('--primary-color', currentTheme.colors.primary);
    root.style.setProperty('--secondary-color', currentTheme.colors.secondary);
    root.style.setProperty('--background-color', currentTheme.colors.background);
    root.style.setProperty('--surface-color', currentTheme.colors.surface);
    root.style.setProperty('--text-color', currentTheme.colors.text);
    root.style.setProperty('--accent-color', currentTheme.colors.accent);
    
    // Set font size custom properties
    root.style.setProperty('--font-small', currentTheme.fontSizes.small);
    root.style.setProperty('--font-medium', currentTheme.fontSizes.medium);
    root.style.setProperty('--font-large', currentTheme.fontSizes.large);
    
    // Add transition styles to body if not already present
    if (!document.querySelector('#theme-transitions')) {
      const style = document.createElement('style');
      style.id = 'theme-transitions';
      style.textContent = `
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        
        body {
          background-color: var(--background-color);
          color: var(--text-color);
          transition: background-color 0.3s ease, color 0.3s ease;
        }
      `;
      document.head.appendChild(style);
    }
  }, [currentTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, currentTheme }),
    [theme, currentTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
