"use client";

import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import style from "./toogle.module.css";
import { useCallback } from "react";

type ThemeType = "light" | "dark";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { updateUser, currentUser } = useAuth();

  const handleThemeChange = useCallback(async (newTheme: ThemeType) => {
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
  }, [setTheme, updateUser, currentUser]);

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
