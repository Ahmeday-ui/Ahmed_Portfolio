import { motion } from "framer-motion";
import logCapgemini from "@/assets/logo-capgemini.png";
import logCikaba from "@/assets/logo-cikaba.png";
import logLimos from "@/assets/logo-limos.png";
import logUCA from "@/assets/logo-uca.png";
import logWafa from "@/assets/logo-wafa.png";

const logos = [
  { src: logCapgemini, alt: "Capgemini", label: "Capgemini" },
  { src: logWafa, alt: "Wafa", label: "Wafa Insurance" },
  { src: logCikaba, alt: "Cikaba", label: "Cikaba" },
  { src: logUCA, alt: "UCA", label: "Université Clermont Auvergne" },
  { src: logLimos, alt: "LIMOS", label: "LIMOS Lab" },
];

export const LogosCarousel = () => {
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full py-12 md:py-16 overflow-hidden">
      <div className="relative">
        {/* Gradient mask for smooth fade at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-8 md:gap-12"
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-3 min-w-max"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Logo container */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 p-3 flex items-center justify-center hover:bg-card hover:border-primary/50 transition-all duration-300">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Label */}
              <span className="text-xs md:text-sm font-medium text-foreground/70 text-center whitespace-nowrap">
                {logo.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
