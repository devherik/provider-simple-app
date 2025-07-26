// In any component:
import { useTheme } from "../../hooks/useTheme";
import style from "./toogle.module.css";

export default function ThemeToggle() {
  const { theme, setTheme, currentTheme } = useTheme();

  return (
    <button
      className={style.button}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Toggle Theme
    </button>
  );
}
