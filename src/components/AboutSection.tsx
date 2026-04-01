import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Code, Database, Lightbulb, TrendingUp, Award } from "lucide-react";

const highlights = [
  { icon: Brain, label: "Machine Learning & Deep Learning", desc: "PyTorch, TensorFlow, scikit-learn" },
  { icon: Code, label: "Python, R, C++", desc: "Développement & Prototypage" },
  { icon: Database, label: "Data Engineering & Cloud", desc: "Azure, AWS, SQL, ETL" },
  { icon: Lightbulb, label: "R&D & Innovation IA", desc: "Recherche appliquée" },
];

const stats = [
  { value: 8, suffix: "+", label: "Projets IA", icon: TrendingUp },
  { value: 3, suffix: "+", label: "Expériences pro", icon: Award },
  { value: 20, suffix: "%", label: "Gain ROI (meilleur projet)", icon: TrendingUp },
  { value: 40, suffix: "%", label: "Réduction temps traitement", icon: Award },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = duration / value;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            À <span className="text-gradient">propos</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-8" />

          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-12">
            Actuellement en Master 2 Statistiques et Traitement de Données à
            l'Université Clermont-Auvergne, je suis en alternance chez{" "}
            <span className="text-foreground font-medium">CIKABA</span> en tant que
            Data Scientist IA. Mon objectif : mettre l'Intelligence Artificielle
            au service de l'humain et de la société.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="text-center p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <p className="font-display text-3xl font-bold text-gradient mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <item.icon
                  size={22}
                  className="text-primary group-hover:scale-110 transition-transform"
                />
              </div>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                {item.label}
              </p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
