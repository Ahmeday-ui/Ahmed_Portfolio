import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const technicalSkills = [
  { name: "Python", level: 95, color: "hsl(var(--primary))" },
  { name: "PyTorch / TensorFlow", level: 90, color: "hsl(var(--primary))" },
  { name: "Machine Learning", level: 92, color: "hsl(var(--primary))" },
  { name: "Deep Learning / NLP", level: 85, color: "hsl(var(--primary))" },
  { name: "R / RStudio", level: 80, color: "hsl(var(--primary))" },
  { name: "SQL / NoSQL", level: 82, color: "hsl(var(--primary))" },
  { name: "Azure / AWS", level: 78, color: "hsl(var(--primary))" },
  { name: "Power BI / Tableau", level: 80, color: "hsl(var(--primary))" },
  { name: "C++ / JavaScript", level: 75, color: "hsl(var(--primary))" },
];

const softSkills = [
  "Travail en équipe",
  "Communication",
  "Résolution de problèmes",
  "Gestion de projet",
  "Apprentissage continu",
  "Esprit analytique",
];

const CircularProgress = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [count, setCount] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= level) clearInterval(timer);
    }, 15);
    return () => clearInterval(timer);
  }, [isInView, level]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.05 }}
      className="flex flex-col items-center group"
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r={radius}
            stroke="hsl(var(--secondary))"
            strokeWidth="6"
            fill="none"
          />
          <circle
            ref={ref}
            cx="50" cy="50" r={radius}
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isInView ? circumference - (level / 100) * circumference : circumference}
            className="transition-all duration-&lsqb;1.5s&rsqb; ease-out"
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.4))" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {count}%
          </span>
        </div>
      </div>
      <p className="mt-3 text-xs md:text-sm font-medium text-muted-foreground text-center group-hover:text-foreground transition-colors max-w-[100px]">
        {name}
      </p>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Compétences <span className="text-gradient">techniques</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />
        </motion.div>

        {/* Circular skill charts */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 mb-16">
          {technicalSkills.map((skill, i) => (
            <CircularProgress key={skill.name} name={skill.name} level={skill.level} delay={i * 0.05} />
          ))}
        </div>

        {/* Soft skills + Languages */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-foreground">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm border border-border hover:border-primary/40 hover:text-primary transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-foreground">
              Langues
            </h3>
            <div className="space-y-4">
              {[
                { lang: "Arabe", level: "Natif", pct: 100, flag: "🇲🇦" },
                { lang: "Français", level: "C1 — Courant", pct: 90, flag: "🇫🇷" },
                { lang: "Anglais", level: "B2 — Intermédiaire", pct: 70, flag: "🇬🇧" },
              ].map((l, i) => (
                <motion.div
                  key={l.lang}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground font-medium flex items-center gap-2">
                      <span className="text-lg">{l.flag}</span> {l.lang}
                    </span>
                    <span className="text-muted-foreground text-xs">{l.level}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full bg-primary/70"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
