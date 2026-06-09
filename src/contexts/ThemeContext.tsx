import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "neural" | "obsidian" | "cipher";

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "neural", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, set] = useState<Theme>(
    () => (localStorage.getItem("aa-theme") as Theme) ?? "neural"
  );

  const setTheme = (t: Theme) => {
    set(t);
    localStorage.setItem("aa-theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
