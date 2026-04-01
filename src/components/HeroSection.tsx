import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Github, Linkedin, Download } from "lucide-react";
import ahmedPhoto from "@/assets/ahmed-photo.png";
import heroBg from "@/assets/hero-bg.jpg";

const roles = [
  "Data Scientist",
  "Machine Learning Engineer",
  "Deep Learning Specialist",
  "AI Researcher",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && text === current) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }
    if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
            width: `${4 + (i % 3) * 4}px`,
            height: `${4 + (i % 3) * 4}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 ? 15 : -15, 0],
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.7 }}
        />
      ))}

      {/* Glow orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex-shrink-0"
        >
          {/* Rotating ring */}
          <motion.div
            className="absolute inset-[-8px] rounded-full border border-dashed border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[-16px] rounded-full border border-dashed border-primary/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          <div className="w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-primary/50 animate-pulse-glow relative">
            <img
              src={ahmedPhoto}
              alt="Ahmed Ayoubi"
              className="w-full h-full object-cover"
            />
            {/* Status badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-foreground font-medium">Disponible</span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-primary animate-float" />
          <div className="absolute -top-3 -left-3 w-4 h-4 rounded-full bg-primary/40 animate-float" style={{ animationDelay: "1s" }} />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 justify-center lg:justify-start mb-3"
          >
            <span className="w-8 h-px bg-primary" />
            <span className="text-primary font-display text-sm tracking-widest uppercase">
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-primary"
              >
                |
              </motion.span>
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-4">
            Ahmed{" "}
            <span className="text-gradient relative">
              Ayoubi
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-6">
            Passionné par l'IA à impact sociétal, je développe des solutions en
            Machine Learning et Deep Learning pour résoudre des défis complexes.
          </p>

          <p className="text-xs text-muted-foreground/70 italic mb-6 max-w-md">
            "L'Intelligence Artificielle au service de l'humain et de la société"
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-primary" /> Aubière, France
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-primary" /> ayoubiahmed02@gmail.com
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Me contacter
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-display font-semibold text-sm hover:bg-secondary transition-colors"
            >
              Mes projets
            </motion.a>
            <div className="flex items-center gap-2 ml-2">
              <motion.a
                href="https://www.linkedin.com/in/ahmed-ayoubi/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary border border-border hover:border-primary/40 transition-colors"
              >
                <Linkedin size={16} />
              </motion.a>
              <motion.a
                href="https://github.com/Ahmeday-ui"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary border border-border hover:border-primary/40 transition-colors"
              >
                <Github size={16} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">Scroll</span>
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
