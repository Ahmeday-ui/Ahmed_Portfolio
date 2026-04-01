import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  slug: string;
}

interface BlogPostLink {
  title: string;
  url: string;
}

interface BlogPostExtended extends BlogPost {
  links: BlogPostLink[];
}

const blogPosts: BlogPostExtended[] = [
  {
    id: "1",
    title: "Comprendre les Transformers : Au-delà des Attention Mechanisms",
    excerpt:
      "Plongée profonde dans l'architecture Transformer, des attention heads aux positional encodings, avec applications en NLP et vision par ordinateur.",
    author: "Ahmed Ayoubi",
    date: "2024-12-15",
    category: "Deep Learning",
    readTime: 12,
    slug: "transformers-explained",
    links: [
      {
        title: "Article scientifique original sur les Transformers : 'Attention Is All You Need'",
        url: "https://arxiv.org/abs/1706.03762",
      },
      {
        title: "Tutoriel détaillé sur l'architecture Transformer (arXiv)",
        url: "https://arxiv.org/abs/2002.04745",
      },
    ],
  },
  {
    id: "2",
    title: "Segmentation Sémantique SAR : Défis et Solutions",
    excerpt:
      "Exploration des défis spécifiques à la segmentation d'images SAR (Synthetic Aperture Radar), avec exemples concrets sur la détection d'inondations.",
    author: "Ahmed Ayoubi",
    date: "2024-11-28",
    category: "Remote Sensing",
    readTime: 10,
    slug: "sar-segmentation",
    links: [
      {
        title: "Étude sur la segmentation sémantique en télédétection avec Transformers",
        url: "https://www.mdpi.com/2072-4292/17/2/290",
      },
      {
        title: "Revue scientifique sur la segmentation d'images SAR",
        url: "https://www.sciencedirect.com/science/article/pii/S0034425721001234",
      },
    ],
  },
  {
    id: "3",
    title: "Transfer Learning en 2025 : Best Practices et Pièges Courants",
    excerpt:
      "Stratégies modernes pour l'utilisation efficace du transfer learning, gestion des domaines décalés, et validation rigoureuse des modèles.",
    author: "Ahmed Ayoubi",
    date: "2024-10-05",
    category: "ML Best Practices",
    readTime: 8,
    slug: "transfer-learning-2025",
    links: [
      {
        title: "Article scientifique sur le transfer learning et ses bonnes pratiques",
        url: "https://arxiv.org/abs/1903.01229",
      },
      {
        title: "Analyse des défis du transfer learning en vision par ordinateur",
        url: "https://arxiv.org/abs/2102.02770",
      },
    ],
  },
];

const BlogSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Deep Learning": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Remote Sensing": "bg-green-500/20 text-green-400 border-green-500/30",
      "ML Best Practices": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };
    return colors[category] || "bg-primary/20 text-primary border-primary/30";
  };

  return (
    <section id="blog" className="relative py-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Articles & <span className="text-gradient">Insights</span> ML
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Réflexions approfondies sur le Machine Learning, la IA et la science des données
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Card className="relative overflow-hidden bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-card/60 transition-all duration-300 group h-full flex flex-col">
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-500" />

                <div className="p-6 flex flex-col h-full">
                  {/* Category tag */}
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className={getCategoryColor(post.category)} size={14} />
                    <span className={`text-xs font-medium px-2 py-1 rounded border ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 border-t border-border/50 pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString("fr-FR")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/btn"
                    whileHover={{ x: 4 }}
                  >
                    Lire l'article
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>

                  {/* Links to resources */}
                  {post.links && post.links.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border/30 space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Resources</p>
                      {post.links.map((link, idx) => (
                        <motion.a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-xs text-primary/70 hover:text-primary transition-colors group/link"
                          whileHover={{ x: 2 }}
                        >
                          <span className="flex-shrink-0 mt-0.5 text-primary/50">→</span>
                          <span className="line-clamp-2 group-hover/link:underline">{link.title}</span>
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            className="group"
            onClick={() => {
              // Link to blog page when created
              console.log("Navigate to blog");
            }}
          >
            Voir tous les articles
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
