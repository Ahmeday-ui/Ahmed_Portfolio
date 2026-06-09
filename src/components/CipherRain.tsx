import { useEffect, useRef } from "react";

const GLYPHS = "01アイウエカキクABCDEF23456789><[]{}=:;#%";

export default function CipherRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FS = 13;
    let W = 0, H = 0, cols: number[] = [], raf: number;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const n = Math.floor(W / FS);
      cols = Array.from({ length: n }, (_, i) => cols[i] ?? -(Math.random() * H));
    };

    const tick = () => {
      ctx.fillStyle = "rgba(5,13,7,0.052)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FS}px 'SF Mono', 'Fira Code', monospace`;

      cols.forEach((y, i) => {
        const highlight = Math.random() > 0.985;
        ctx.fillStyle = highlight
          ? "rgba(196,255,196,0.9)"
          : "rgba(34,197,94,0.52)";
        ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], i * FS, y);
        cols[i] = y > H + FS * 8 ? -(Math.random() * H * 0.6) : y + FS * (0.28 + Math.random() * 0.18);
      });

      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed", inset: 0,
        opacity: 0.09,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
