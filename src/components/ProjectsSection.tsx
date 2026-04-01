import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText, Github, X, FlaskConical, BarChart3, Star, ChevronRight, Eye, Lock } from "lucide-react";
import AccessRequestModal from "./AccessRequestModal";

import projectFlood from "@/assets/project-flood.jpg";
import projectStan from "@/assets/project-stan.jpg";
import projectNba from "@/assets/project-nba.jpg";
import projectTimeseries from "@/assets/project-timeseries.jpg";
import projectAfd from "@/assets/project-afd.jpg";
import projectSafety from "@/assets/project-safety.jpg";
import projectInsurance from "@/assets/project-insurance.jpg";
import projectAzure from "@/assets/project-azure.jpg";

interface Project {
  title: string;
  marketingTitle: string;
  summary: string;
  description: string;
  image: string;
  methodology: {
    models: string[];
    datasets?: string;
    techniques: string[];
    tools?: string;
  };
  results: string[];
  strengths: string[];
  tags: string[];
  keywords: string[];
  level: string;
  reportUrl: string;
  githubUrl: string;
  highlight: boolean;
}

const projects: Project[] = [
  {
    title: "DLISCES – Segmentation des Zones Inondées",
    marketingTitle: "FloodVision : IA Transformer pour Cartographier les Inondations depuis l'Espace",
    summary:
      "Pipeline complet de segmentation d'images SAR Sentinel-1 pour identifier automatiquement les zones inondées via EDAFormer (Transformer moderne).",
    description:
      "Le projet s'inscrit dans le programme DLISCES au LIMOS, centré sur l'utilisation de l'IA pour la gestion des risques naturels. L'objectif était de développer un modèle performant capable de segmenter les zones inondées dans des images SAR Sentinel-1, particulièrement complexes en contexte urbain. Le travail a inclus une phase poussée de préparation des données : normalisation radiométrique, harmonisation multi-capteurs, stratification, augmentation et équilibrage. Le modèle EDAFormer — une architecture Transformer légère et sans embeddings — a été entraîné et évalué sur des jeux de données variés et très déséquilibrés, avec une attention particulière portée au transfer learning cross-dataset.",
    image: projectFlood,
    methodology: {
      models: ["EDAFormer (Transformer embedding-free)", "MMSegmentation", "Variantes EFT_T"],
      datasets: "Sen1Floods11, UrbanSARFloods (8 canaux SAR → harmonisation VV/VH)",
      techniques: [
        "Normalisation radiométrique multi-capteurs",
        "Augmentation spectrale et géométrique",
        "Transfer learning croisé (Sen1 → UrbanSARFloods, inverse)",
        "Segmentation sémantique (binaire / multi-classes)",
      ],
    },
    results: [
      "Sen1Floods11 : mIoU ≈ 0.63, mDice ≈ 0.74",
      "UrbanSARFloods : mIoU ≈ 0.64, forte robustesse en milieu urbain dense",
      "Amélioration du transfert multi-datasets (~+5–10 pts sur mIoU)",
      "Bonne capacité à détecter les nappes homogènes",
    ],
    strengths: [
      "Pipeline complet et rigoureux (prétraitements → modèle → analyse d'erreurs)",
      "Adaptation réussie d'un Transformer moderne à la télédétection SAR",
      "Analyse approfondie du déséquilibre et de la généralisation",
    ],
    tags: ["Deep Learning", "Transformer", "Sentinel-1", "SAR", "Segmentation"],
    keywords: ["Segmentation d'images", "Sentinel-1", "SAR", "Deep Learning", "Transformer", "EDAFormer", "Inondations", "Télédétection"],
    level: "Avancé",
    reportUrl: "https://github.com/Ahmeday-ui/portfolio/blob/main/public/Projects/SUPPLEMENTARY_FILES_MANIFEST.md",
    githubUrl: "https://github.com/Ahmeday-ui",
    highlight: true,
  },
  {
    title: "STAN – Analyse Boursière (R/Shiny)",
    marketingTitle: "STAN : Le Tableau de Bord Intelligent pour Décoder les Tendances du Marché",
    summary:
      "Application web interactive en R/Shiny pour analyser tout actif boursier via Yahoo Finance avec régression logarithmique et bandes de valorisation.",
    description:
      "Le projet STAN vise à fournir une plateforme intuitive d'analyse financière basée sur les données historiques de marchés. L'application récupère automatiquement les cours depuis Yahoo Finance, les stocke localement, puis permet à l'utilisateur de sélectionner un actif et une période d'analyse. Elle calcule des indicateurs essentiels tels que le CAGR, la volatilité journalière, les rendements historiques multi-horizons, ainsi que les paramètres de régression logarithmique. L'interface Shiny est structurée en cinq panneaux : indicateurs de base, réglages, performances avancées, graphique en échelle log, et gestion de base de données.",
    image: projectStan,
    methodology: {
      models: ["Régression linéaire sur le log-prix"],
      datasets: "Données boursières Yahoo Finance via quantmod::getSymbols()",
      techniques: [
        "Analyse de séries temporelles financières",
        "Calcul d'indicateurs financiers : CAGR, volatilité log-rendement",
        "Visualisation avancée (ggplot2, échelle log10)",
        "Architecture réactive Shiny (valueBoxes, observeEvent, reactiveValues)",
      ],
      tools: "R, Shiny, quantmod, ggplot2",
    },
    results: [
      "Calcul automatique du CAGR, volatilité et rendements multi-horizons (1M–5A)",
      "Beta → taux de croissance annuel log, Sigma → volatilité résidus",
      "Position sigma → niveau de sur/sous-valorisation instantané",
      "Usage hors-ligne après chargement initial des données",
    ],
    strengths: [
      "Application entièrement interactive et réactive avec Shiny",
      "Double source : données locales + récupération automatique",
      "Visualisation pédagogique en échelle logarithmique",
      "Architecture robuste avec gestion d'erreurs",
    ],
    tags: ["R", "Shiny", "Finance", "Régression", "Yahoo Finance"],
    keywords: ["Finance Quantitative", "Séries Temporelles", "Shiny", "Régression Logarithmique", "Volatilité", "Yahoo Finance"],
    level: "Intermédiaire",
    reportUrl: "https://github.com/Ahmeday-ui/Projet_R_Shiny_STAN",
    githubUrl: "https://github.com/Ahmeday-ui/Projet_R_Shiny_STAN",
    highlight: true,
  },
  {
    title: "NBA – Analyse Statistique & Modélisation",
    marketingTitle: "CourtAnalytics : Explorer la NBA avec la Data Science",
    summary:
      "Analyse NBA combinant statistiques avancées, machine learning, visualisations et modélisation prédictive pour expliquer la performance des joueurs et équipes.",
    description:
      "Ce projet explore en profondeur les données NBA : performances individuelles, métriques avancées, efficacité offensive/défensive, dynamiques collectives et tendances tactiques (small-ball, tir à 3 points, spacing). La méthodologie inclut la collecte de données officielles NBA, leur transformation et visualisation via tableaux, heatmaps, shot-charts, ainsi que l'application de modèles statistiques et de machine learning. Des analyses qualitatives complètent le travail : impact des blessures, trades, calendrier, progression des joueurs.",
    image: projectNba,
    methodology: {
      models: ["Régressions", "Clustering", "Modèles prédictifs", "Simulations"],
      datasets: "Stats officielles NBA, play-by-play, tracking data",
      techniques: [
        "Visualisation (heatmaps, shot charts)",
        "Feature engineering",
        "Analyse multicritère",
        "Classification et prédiction de résultats",
      ],
    },
    results: [
      "Identification des facteurs de victoire (efficacité 3 pts, spacing, turnover rate)",
      "Détection des joueurs surperformants / sous-évalués via métriques avancées",
      "Modèles prédictifs avec précision > 80%",
    ],
    strengths: [
      "Combinaison rare d'analyse descriptive, statistique avancée et ML",
      "Très riche visuellement et pédagogiquement",
    ],
    tags: ["Python", "ML", "Sport Analytics", "Clustering", "Visualisation"],
    keywords: ["NBA Analytics", "Machine Learning", "Sport Analytics", "PER", "Offensive Rating", "Clustering"],
    level: "Intermédiaire – Avancé",
    reportUrl: "https://github.com/Ahmeday-ui/portfolio/blob/main/public/Projects/SUPPLEMENTARY_FILES_MANIFEST.md",
    githubUrl: "https://github.com/Ahmeday-ui",
    highlight: false,
  },
  {
    title: "Séries Chronologiques – ARIMA, Prophet & Deep Learning",
    marketingTitle: "TimeMaster : Prévoir le Futur grâce à la Data Science",
    summary:
      "Projet complet d'analyse et de prévision de séries temporelles incluant modélisation statistique et deep learning, appliqué à la finance, météo et industrie.",
    description:
      "Le projet couvre toute la chaîne d'analyse de séries temporelles : preprocessing avancé (transformation, différenciation, détection des anomalies), étude de la stationnarité, décomposition (tendance/saison/bruit), visualisation interactive, modélisation ARIMA/SARIMA/Holt-Winters/Prophet, et exploration de modèles LSTM pour capturer les dépendances longues. Plusieurs jeux de données sont étudiés (ventes, météo, signaux économiques) avec validation croisée temporelle et analyse des résidus.",
    image: projectTimeseries,
    methodology: {
      models: ["ARIMA", "SARIMA", "Holt-Winters", "Prophet", "LSTM/RNN"],
      techniques: [
        "Tests ADF/KPSS, ACF/PACF",
        "Décomposition STL",
        "Cross-validation temporelle",
        "Analyse des résidus",
      ],
      tools: "Python (pandas, statsmodels, scikit-learn, TensorFlow), R (forecast)",
    },
    results: [
      "Précisions élevées sur différents horizons (RMSE/MAE)",
      "Identification des composantes saisonnières et anomalies",
      "Comparaison fine des modèles pour chaque dataset",
    ],
    strengths: [
      "Couverture exhaustive de la théorie et de la pratique",
      "Intégration de techniques statistiques et deep learning",
    ],
    tags: ["Python", "ARIMA", "Prophet", "LSTM", "Time Series"],
    keywords: ["Time Series", "ARIMA", "Forecasting", "Prophet", "LSTM", "Seasonality"],
    level: "Intermédiaire",
    reportUrl: "https://github.com/Ahmeday-ui/portfolio/blob/main/public/Projects/SUPPLEMENTARY_FILES_MANIFEST.md",
    githubUrl: "https://github.com/Ahmeday-ui",
    highlight: false,
  },
  {
    title: "AFD – Classification Supervisée Multivariée (R)",
    marketingTitle: "ClassiViz : Explorer les Groupes grâce à l'Analyse Discriminante",
    summary:
      "TP d'Analyse Factorielle Discriminante pour discriminer des groupes à partir de variables explicatives continues dans un contexte multivarié sous R.",
    description:
      "Le projet met en œuvre l'AFD pour analyser la séparation entre groupes préexistants dans un espace multivarié. L'approche comprend la standardisation, l'ajustement du modèle, l'analyse des axes discriminants, la visualisation des individus/projections et l'évaluation de la capacité prédictive du modèle.",
    image: projectAfd,
    methodology: {
      models: ["Analyse Factorielle Discriminante (LDA/AFD)"],
      techniques: [
        "Standardisation",
        "Matrice de covariance intra/inter",
        "Axes discriminants",
        "Visualisation des projections",
      ],
      tools: "R (MASS::lda)",
    },
    results: [
      "Séparation visuelle des groupes",
      "Taux de classification correcte évalué",
    ],
    strengths: [
      "Méthode supervisée intuitive et visuelle",
      "Application pédagogique structurée",
    ],
    tags: ["R", "LDA", "Classification", "Statistiques", "Multivarié"],
    keywords: ["AFD", "LDA", "Classification", "R", "Multivarié"],
    level: "Débutant – Intermédiaire",
    reportUrl: "https://github.com/Ahmeday-ui/TP2_AFD_Classification",
    githubUrl: "https://github.com/Ahmeday-ui/TP2_AFD_Classification",
    highlight: false,
  },
  {
    title: "Prévention des Risques Professionnels – IA",
    marketingTitle: "Prédire pour Protéger : L'IA au Service de la Sécurité au Travail",
    summary:
      "Développement de modèles prédictifs de prévention des accidents du travail utilisant des données multisources. Classification, régression, NLP et séries temporelles.",
    description:
      "Ce projet vise à développer des modèles prédictifs pour anticiper et prévenir les accidents du travail en exploitant des données multisources. L'approche combine classification, régression, NLP et séries temporelles pour identifier les facteurs de risque et proposer des mesures préventives ciblées.",
    image: projectSafety,
    methodology: {
      models: ["Classification", "Régression", "NLP", "Séries temporelles"],
      techniques: [
        "Data engineering et intégration multisources",
        "Feature engineering avancé",
        "Modélisation prédictive multi-approches",
        "Analyse textuelle des rapports d'incidents",
      ],
    },
    results: [
      "Identification des principaux facteurs de risque",
      "Modèles prédictifs opérationnels",
      "Recommandations préventives basées sur les données",
    ],
    strengths: [
      "Combinaison de plusieurs approches ML complémentaires",
      "Impact social direct sur la sécurité au travail",
    ],
    tags: ["Python", "ML", "NLP", "Data Engineering"],
    keywords: ["Prévention", "Machine Learning", "NLP", "Séries temporelles", "Sécurité"],
    level: "Intermédiaire – Avancé",
    reportUrl: "https://github.com/Ahmeday-ui/Ahmed_Project_SC",
    githubUrl: "https://github.com/Ahmeday-ui/Ahmed_Project_SC",
    highlight: true,
  },
  {
    title: "Modélisation Prédictive – Assurance Automobile",
    marketingTitle: "RiskPredict : IA pour l'Estimation des Risques Automobile",
    summary:
      "Modèle prédictif pour l'estimation des risques d'assurance automobile avec régression logistique, Random Forest et Gradient Boosting – gain ROI de 20%.",
    description:
      "Ce projet développe un modèle prédictif pour estimer les risques d'assurance automobile. L'approche combine plusieurs algorithmes de machine learning pour optimiser la tarification et la détection des profils à risque, aboutissant à un gain ROI significatif de 20%.",
    image: projectInsurance,
    methodology: {
      models: ["Régression logistique", "Random Forest", "Gradient Boosting"],
      techniques: [
        "Feature engineering sur données assurantielles",
        "Comparaison multi-modèles",
        "Optimisation des hyperparamètres",
        "Analyse ROI",
      ],
    },
    results: [
      "Gain ROI de 20% sur l'estimation des risques",
      "Comparaison fine des performances par modèle",
      "Profiling automatique des assurés à risque",
    ],
    strengths: [
      "Impact business direct et mesurable",
      "Approche multi-modèles rigoureuse",
    ],
    tags: ["Python", "Statistiques", "Machine Learning"],
    keywords: ["Assurance", "Machine Learning", "Régression", "Random Forest", "Gradient Boosting"],
    level: "Intermédiaire",
    reportUrl: "https://github.com/Ahmeday-ui",
    githubUrl: "https://github.com/Ahmeday-ui",
    highlight: false,
  },
  {
    title: "Nettoyage Intelligent de Données – Azure Cloud",
    marketingTitle: "CloudClean : Automatisation du Nettoyage de Données sur Azure",
    summary:
      "Algorithme de vérification et nettoyage automatique de données de facturation en environnement Azure Cloud, réduisant de 40% le temps de traitement.",
    description:
      "Ce projet développe un algorithme intelligent de vérification et nettoyage automatique de données de facturation déployé en environnement Azure Cloud. L'automatisation du pipeline ETL a permis une réduction significative du temps de traitement de 40%.",
    image: projectAzure,
    methodology: {
      models: ["Pipeline ETL automatisé"],
      techniques: [
        "Vérification automatique de la qualité des données",
        "Nettoyage intelligent basé sur des règles métier",
        "Déploiement cloud Azure",
        "Monitoring et alertes",
      ],
    },
    results: [
      "Réduction de 40% du temps de traitement",
      "Amélioration de la qualité des données de facturation",
      "Pipeline automatisé et reproductible",
    ],
    strengths: [
      "Impact opérationnel direct et mesurable",
      "Architecture cloud scalable",
    ],
    tags: ["Azure", "Big Data", "Automatisation", "ETL"],
    keywords: ["Azure", "ETL", "Data Quality", "Cloud", "Automatisation"],
    level: "Intermédiaire",
    reportUrl: "https://github.com/Ahmeday-ui",
    githubUrl: "https://github.com/Ahmeday-ui",
    highlight: false,
  },
];

const levelColor = (level: string) => {
  if (level.includes("Avancé")) return "bg-destructive/15 text-destructive border-destructive/25";
  if (level.includes("Intermédiaire")) return "bg-primary/15 text-primary border-primary/25";
  return "bg-secondary text-secondary-foreground border-border";
};

const ProjectModal = ({ project, onClose, onRequestAccess }: { project: Project; onClose: () => void; onRequestAccess: (project: Project, type: "report" | "github") => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.25 }}
      className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal hero image */}
      <div className="relative h-48 md:h-64 overflow-hidden rounded-t-2xl">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-background/60 backdrop-blur-sm text-foreground hover:bg-background/80 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 md:p-8 -mt-16 relative">
        <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border mb-4 ${levelColor(project.level)}`}>
          {project.level}
        </span>

        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1 pr-10">
          {project.title}
        </h3>
        <p className="text-xs text-muted-foreground italic mb-6">{project.marketingTitle}</p>

        {/* Description */}
        <div className="mb-6">
          <h4 className="flex items-center gap-2 font-display font-semibold text-foreground mb-2">
            <FileText size={16} className="text-primary" /> Description
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        </div>

        {/* Méthodologie */}
        <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-border">
          <h4 className="flex items-center gap-2 font-display font-semibold text-foreground mb-3">
            <FlaskConical size={16} className="text-primary" /> Méthodologie
          </h4>
          <div className="space-y-2">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Modèles</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.methodology.models.map((m) => (
                  <span key={m} className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">{m}</span>
                ))}
              </div>
            </div>
            {project.methodology.datasets && (
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Données</span>
                <p className="text-xs text-muted-foreground mt-0.5">{project.methodology.datasets}</p>
              </div>
            )}
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Techniques</span>
              <ul className="mt-1 space-y-1">
                {project.methodology.techniques.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <ChevronRight size={12} className="text-primary mt-0.5 shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            {project.methodology.tools && (
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Outils</span>
                <p className="text-xs text-muted-foreground mt-0.5">{project.methodology.tools}</p>
              </div>
            )}
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-6">
          <h4 className="flex items-center gap-2 font-display font-semibold text-foreground mb-2">
            <BarChart3 size={16} className="text-primary" /> Résultats
          </h4>
          <ul className="space-y-1.5">
            {project.results.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" /> {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Points forts */}
        <div className="mb-6">
          <h4 className="flex items-center gap-2 font-display font-semibold text-foreground mb-2">
            <Star size={16} className="text-primary" /> Points forts
          </h4>
          <ul className="space-y-1.5">
            {project.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Star size={12} className="text-primary mt-1 shrink-0 fill-primary" /> {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.keywords.map((k) => (
            <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
              {k}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <button
            onClick={() => onRequestAccess(project, "report")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Lock size={14} /> <FileText size={16} /> Consulter le rapport
          </button>
          <button
            onClick={() => onRequestAccess(project, "github")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <Lock size={14} /> <Github size={16} /> Code source
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | "highlight">("all");
  const [accessModal, setAccessModal] = useState<{ open: boolean; title: string; url: string }>({ open: false, title: "", url: "" });

  const handleRequestAccess = (project: Project, type: "report" | "github") => {
    const url = type === "report" ? project.reportUrl : project.githubUrl;
    setAccessModal({ open: true, title: project.title, url });
  };

  const filteredProjects = filter === "highlight" ? projects.filter((p) => p.highlight) : projects;

  return (
    <section id="projects" className="section-padding bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Mes <span className="text-gradient">projets</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-4" />
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Découvrez mes projets en Data Science et Intelligence Artificielle.
            Chaque projet inclut un rapport détaillé consultable en ligne.
          </p>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-10">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
            >
              Tous ({projects.length})
            </button>
            <button
              onClick={() => setFilter("highlight")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "highlight" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
            >
              ⭐ Projets phares
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              layout
              className={`group relative flex flex-col rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-xl overflow-hidden ${
                project.highlight
                  ? "bg-background border-primary/30 hover:border-primary/60 hover:shadow-primary/10"
                  : "bg-background border-border hover:border-primary/30 hover:shadow-primary/5"
              }`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={800}
                  height={512}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {project.highlight && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Star size={10} className="fill-current" /> Phare
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye size={14} /> Voir les détails
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span className={`self-start text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-3 ${levelColor(project.level)}`}>
                  {project.level}
                </span>

                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors text-sm leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed flex-1 line-clamp-3">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border">
                  <button
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRequestAccess(project, "report");
                    }}
                  >
                    <Lock size={10} /> <FileText size={13} /> Rapport
                  </button>
                  <button
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRequestAccess(project, "github");
                    }}
                  >
                    <Lock size={10} /> <Github size={13} /> Code
                  </button>
                  <span className="ml-auto text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Détails <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More projects on GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl border border-border bg-background text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Github size={24} className="text-primary" />
            <h3 className="font-display text-xl font-bold text-foreground">
              D'autres projets <span className="text-gradient">ML & Deep Learning</span>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-5 max-w-xl mx-auto">
            Retrouvez l'ensemble de mes projets en Machine Learning et Deep Learning sur mon GitHub — notebooks, pipelines, modèles et expérimentations.
          </p>
          <a
            href="https://github.com/Ahmeday-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Github size={18} /> Explorer mon GitHub <ExternalLink size={14} />
          </a>
        </motion.div>

        {/* Conferences & Meetups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <h3 className="font-display text-2xl font-bold mb-2">
            Conférences & <span className="text-gradient">Meetups IA</span>
          </h3>
          <div className="w-12 h-1 bg-primary rounded-full mb-8" />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Conférences */}
            <div className="p-6 rounded-xl border border-border bg-background hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">🎤</span>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground">Conférences</h4>
                  <p className="text-xs text-muted-foreground">France & Maroc</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { title: "Conférences Data & IA", location: "France", desc: "Participation à des conférences sur le Machine Learning, le Deep Learning et l'IA appliquée en France." },
                  { title: "Conférences Tech & Innovation", location: "Maroc", desc: "Participation à des événements tech et innovation au Maroc sur la Data Science et le Big Data." },
                ].map((conf, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{conf.title}</p>
                      <p className="text-xs text-primary">{conf.location}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{conf.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Meetups IA */}
            <div className="p-6 rounded-xl border border-border bg-background hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground">Meetups IA</h4>
                  <p className="text-xs text-muted-foreground">Networking & veille technologique</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { title: "Meetups Machine Learning & Deep Learning", desc: "Échanges avec des professionnels et chercheurs autour des dernières avancées en IA, NLP et Computer Vision." },
                  { title: "Meetups Data Engineering & MLOps", desc: "Discussions sur les pipelines de données, le déploiement de modèles en production et les bonnes pratiques MLOps." },
                ].map((meetup, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{meetup.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{meetup.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} onRequestAccess={handleRequestAccess} />
        )}
      </AnimatePresence>

      <AccessRequestModal
        isOpen={accessModal.open}
        onClose={() => setAccessModal({ open: false, title: "", url: "" })}
        projectTitle={accessModal.title}
        targetUrl={accessModal.url}
      />
    </section>
  );
};

export default ProjectsSection;
