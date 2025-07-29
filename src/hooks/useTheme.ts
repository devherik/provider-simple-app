import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";


export function useTheme() {
    // Custom hook to access theme context
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}