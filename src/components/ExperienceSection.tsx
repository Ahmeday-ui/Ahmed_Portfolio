import { motion } from "framer-motion";
import logoCikaba from "@/assets/logo-cikaba.png";
import logoLimos from "@/assets/logo-limos.png";
import logoCapgemini from "@/assets/logo-capgemini.png";
import logoWafa from "@/assets/logo-wafa.png";

const experiences = [
  {
    title: "Data Scientist – IA en alternance M2",
    company: "CIKABA – Making Safety Smart",
    location: "Clermont-Ferrand",
    period: "Sept 2025 – Présent",
    logo: logoCikaba,
    tags: ["Python", "ML", "DL", "NLP", "Data Engineering", "R", "Azure"],
    points: [
      "Développement de solutions d'IA pour la prévention des risques professionnels (société labellisée France 2030)",
      "ML/DL : Modèles de classification, régression, NLP, séries temporelles avec scikit-learn, TensorFlow et PyTorch",
      "Data Engineering : Pipelines temps réel (ETL), agrégation et traitement de données métier",
      "Modélisation prédictive : Prévention des accidents du travail avec données multisources",
    ],
    current: true,
  },
  {
    title: "Stage M1 – Deep Learning & Images Satellites",
    company: "LIMOS – Laboratoire d'Informatique",
    location: "Clermont-Ferrand",
    period: "Avril – Juillet 2025",
    logo: logoLimos,
    tags: ["PyTorch", "OpenCV", "QGIS", "Transfer Learning"],
    points: [
      "Projet DLISCES : Classification automatique de dégâts de catastrophes naturelles",
      "Développement de modèles CNN (YOLOv8, ResNet, U-Net) pour images satellites haute résolution",
      "Transfer Learning et augmentation de données pour améliorer les performances",
    ],
    current: false,
  },
  {
    title: "Stage – Data Engineering & Cloud Computing",
    company: "Capgemini Maroc",
    location: "Casablanca, Maroc",
    period: "Juin – Sept 2023",
    logo: logoCapgemini,
    tags: ["Python", "Azure Cloud", "Big Data", "Automatisation"],
    points: [
      "Algorithme intelligent de vérification et nettoyage de données en Azure Cloud",
      "Gestion 40% plus rapide et 95% plus précise des factures transporteurs",
      "Orchestration pipeline Azure (Data Factory, Logic Apps)",
    ],
    current: false,
  },
  {
    title: "Stage – Modélisation Prédictive & Actuariat",
    company: "Wafa Assurance",
    location: "Casablanca, Maroc",
    period: "Mars – Juillet 2022",
    logo: logoWafa,
    tags: ["Python", "Machine Learning", "Big Data", "Statistiques"],
    points: [
      "Modèle prédictif pour estimation des risques d'assurance automobile",
      "Régression logistique, Random Forest, Gradient Boosting pour prédiction de sinistres",
      "Gain en ROI de 20% par amélioration de tarification basée modèle",
    ],
    current: false,
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Expériences <span className="text-gradient">professionnelles</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-12" />
        </motion.div>

        <div className="relative">
          {/* Timeline line with glow */}
          <div className="absolute left-[31px] top-2 bottom-2 w-px hidden md:block">
            <div className="w-full h-full bg-border" />
            <motion.div
              className="absolute top-0 w-full bg-primary/50"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ filter: "blur(1px)" }}
            />
          </div>

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative md:pl-24"
              >
                {/* Timeline dot with glow */}
                <div className="hidden md:flex absolute left-0 top-6">
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-xl bg-white border-2 ${exp.current ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'} flex items-center justify-center overflow-hidden p-2 transition-all`}>
                      <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                    {exp.current && (
                      <motion.div
                        className="absolute -inset-1 rounded-xl border border-primary/30"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                </div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className={`p-6 rounded-xl bg-card border ${exp.current ? 'border-primary/30 shadow-lg shadow-primary/5' : 'border-border hover:border-primary/30'} transition-all hover:shadow-lg hover:shadow-primary/5`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div className="flex items-start gap-3">
                      {/* Mobile logo */}
                      <div className={`md:hidden w-12 h-12 rounded-lg bg-white border ${exp.current ? 'border-primary' : 'border-border'} flex items-center justify-center overflow-hidden p-1.5 flex-shrink-0`}>
                        <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-primary text-sm">{exp.company}</p>
                        <p className="text-muted-foreground text-xs">{exp.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start">
                      {exp.current && (
                        <span className="flex items-center gap-1 text-[10px] text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Actuel
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground whitespace-nowrap bg-secondary px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
