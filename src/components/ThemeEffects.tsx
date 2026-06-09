import { useTheme } from "@/contexts/ThemeContext";
import NeuralCanvas from "./NeuralCanvas";
import CipherRain from "./CipherRain";

export default function ThemeEffects() {
  const { theme } = useTheme();
  if (theme === "neural") return <NeuralCanvas />;
  if (theme === "cipher") return <CipherRain />;
  return null;
}
