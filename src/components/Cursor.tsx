import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springCfg = { stiffness: 130, damping: 18, mass: 0.4 };
  const ringX = useSpring(mouseX, springCfg);
  const ringY = useSpring(mouseY, springCfg);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.classList.add("custom-cursor");
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHoveringInteractive(
        !!t.closest("a, button, [role='button'], input, textarea, select, label, [tabindex]")
      );
    };

    const onLeave = () => setHoveringInteractive(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onLeave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      {/* Spring-lagged ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hoveringInteractive ? 1.9 : 1, opacity: hoveringInteractive ? 0.7 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 20 } }}
      />
      {/* Instant dot */}
      <motion.div
        className="cursor-dot"
        style={{ x: mouseX, y: mouseY }}
        animate={{ scale: hoveringInteractive ? 0.4 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 25 } }}
      />
    </>
  );
}
