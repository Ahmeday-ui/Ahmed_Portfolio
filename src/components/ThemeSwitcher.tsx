import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Palette } from "lucide-react";
import { useTheme, type Theme } from "@/contexts/ThemeContext";

const THEMES: Array<{ id: Theme; label: string; desc: string; color: string }> = [
  { id: "neural",   label: "Neural",   desc: "AI Lab",   color: "hsl(174,72%,52%)" },
  { id: "obsidian", label: "Obsidian", desc: "Prestige", color: "hsl(44,88%,58%)"  },
  { id: "cipher",   label: "Cipher",   desc: "Terminal", color: "hsl(120,65%,52%)" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const active = THEMES.find(t => t.id === theme)!;

  return (
    <div className="fixed bottom-6 right-6 z-[9980] flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.17 }}
            className="glass rounded-xl overflow-hidden shadow-2xl border border-border/60 min-w-[188px]"
          >
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                  theme === t.id
                    ? "font-semibold bg-white/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                <span className="relative flex-shrink-0">
                  <span className="block w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                  {theme === t.id && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: t.color, opacity: 0.35 }}
                    />
                  )}
                </span>
                <span style={theme === t.id ? { color: t.color } : undefined}>{t.label}</span>
                <span className="text-[10px] text-muted-foreground/50 ml-auto font-mono">{t.desc}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass shadow-lg border border-border/50 text-xs font-mono uppercase tracking-wider transition-colors"
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: active.color }} />
        <span className="text-foreground font-semibold">{active.label}</span>
        <Palette size={11} className="text-muted-foreground ml-0.5" />
      </motion.button>
    </div>
  );
}
