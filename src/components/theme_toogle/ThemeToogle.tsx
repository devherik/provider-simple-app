// In any component:
import { useTheme } from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, setTheme, currentTheme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: currentTheme.colors.background,
      color: currentTheme.colors.text,
      fontSize: currentTheme.fontSizes.medium
    }}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}