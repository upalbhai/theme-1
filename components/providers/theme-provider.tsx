"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export type ThemePreset = "violet" | "emerald" | "blue" | "amber" | "rose";

interface ThemeContextType {
  preset: ThemePreset;
  setPreset: (preset: ThemePreset) => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  preset: "violet",
  setPreset: () => {},
});

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  const [preset, setPresetState] = React.useState<ThemePreset>("violet");

  const setPreset = React.useCallback((newPreset: ThemePreset) => {
    setPresetState(newPreset);
    document.documentElement.setAttribute("data-theme", newPreset);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", preset);
  }, [preset]);

  return (
    <NextThemesProvider {...props}>
      <ThemeContext.Provider value={{ preset, setPreset }}>
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
}

export const useThemePreset = () => React.useContext(ThemeContext);
