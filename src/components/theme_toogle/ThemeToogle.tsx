"use client";

import { useTheme } from "../../hooks/useTheme";
import style from "./toogle.module.css";
import day_icon from "./sun.svg";
import night_icon from "./moon.svg";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={style.button}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <div className={style.body}>
        <span className={`${style.toggle} ${theme === "dark" ? style.active : ""}`} />
        <img src={night_icon} alt="Night Icon" />
        <img src={day_icon} alt="Day Icon" />
      </div>
    </button>
  );
}
