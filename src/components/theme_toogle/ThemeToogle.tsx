"use client";

import { useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import style from "./toogle.module.css";

type ThemeType = "light" | "dark";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { updateUser, currentUser } = useAuth();

  const handleThemeChange = async (newTheme: ThemeType) => {
    setTheme(newTheme);
    if (currentUser) {
      try {
        await updateUser({
          userId: currentUser.userId,
          userName: currentUser.userName,
          password: currentUser.password || "password",
          theme: newTheme,
          token: currentUser.token || "",
        });
      } catch (error) {
        console.error("Failed to update user theme:", error);
      }
    }
  };

  return (
    <button
      className={style.button}
      onClick={() => handleThemeChange(theme === "light" ? "dark" : "light")}
    >
      <div className={style.body}>
        <span
          className={`${style.toggle} ${theme === "dark" ? style.active : ""}`}
        />
      </div>
    </button>
  );
}
