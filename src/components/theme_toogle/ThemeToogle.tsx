"use client";

import { useTheme } from "../../hooks/useTheme";
import style from "./toogle.module.css";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={style.button}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <div className={style.body}>
        <span
          className={`${style.toggle} ${theme === "dark" ? style.active : ""}`}
        />
      </div>
    </button>
  );
}
