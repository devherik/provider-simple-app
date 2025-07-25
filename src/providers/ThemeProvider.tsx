"use client";

import React, { createContext, useMemo, useState } from "react";

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

  const value = useMemo(
    () => ({ theme, setTheme, currentTheme }),
    [theme, currentTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
