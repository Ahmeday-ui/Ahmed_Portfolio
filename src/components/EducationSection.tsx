import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import logoUca from "@/assets/logo-uca.png";

const education = [
  {
    degree: "Master 2 Statistiques et Traitement de Données",
    school: "Université Clermont-Auvergne",
    period: "2025 – 2026",
    detail: "En alternance – Spécialisation ML, Deep Learning, Big Data",
    logo: logoUca,
    current: true,
  },
  {
    degree: "Master 1 Statistiques et Traitement de Données",
    school: "Université Clermont-Auvergne",
    period: "2024 – 2025",
    detail: "Data Science, Statistiques avancées, Programmation Big Data",
    logo: logoUca,
    current: false,
  },
  {
    degree: "Licence Sciences et Technologie – Mathématiques",
    school: "Université Clermont-Auvergne",
    period: "2023 – 2024",
    detail: "",
    logo: logoUca,
    current: false,
  },
  {
    degree: "Classes Préparatoires MPSI-MP",
    school: "Lycée Reda Slaoui – Agadir, Maroc",
    period: "2021 – 2023",
    detail: "",
    logo: null,
    current: false,
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="section-padding bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">Formation</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />
        </motion.div>

        {/* Timeline layout */}
        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline node */}
                <div className="absolute left-0 top-2">
                  {edu.logo ? (
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white border-2 ${edu.current ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'} flex items-center justify-center overflow-hidden p-1.5 transition-all`}>
                      <img src={edu.logo} alt={edu.school} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/10 border border-border flex items-center justify-center">
                      <BookOpen size={22} className="text-primary" />
                    </div>
                  )}
                </div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className={`p-6 rounded-xl bg-background border ${edu.current ? 'border-primary/30 shadow-lg shadow-primary/5' : 'border-border hover:border-primary/30'} transition-all group`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {edu.current && (
                      <span className="flex items-center gap-1 text-[10px] text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        En cours
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-primary mb-1">{edu.school}</p>
                  {edu.detail && (
                    <p className="text-xs text-muted-foreground">{edu.detail}</p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
