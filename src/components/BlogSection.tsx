import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "transformers-self-attention",
    title: "Self-Attention Demystified: Understanding Transformers from First Principles",
    excerpt:
      "In 2017, 'Attention is All You Need' dropped and nothing in NLP was ever the same. I take apart the full architecture piece by piece — QKV matrices, scaled dot-product attention, multi-head mechanisms, positional encodings — with working PyTorch code and custom diagrams.",
    date: "2024-11-12",
    category: "Deep Learning",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    tags: ["Transformers", "NLP", "PyTorch", "Self-Attention"],
    featured: true,
  },
  {
    id: "2",
    slug: "rlhf-demystified",
    title: "RLHF Demystified: How We Teach LLMs to Actually Behave",
    excerpt:
      "Pretraining gives you a powerful but unpredictable model. RLHF is what turns it into something useful. A rigorous walkthrough of SFT, reward model training, PPO optimization, and why DPO is now taking over.",
    date: "2025-01-08",
    category: "AI & LLMs",
    readTime: 22,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    tags: ["RLHF", "LLMs", "Alignment", "PPO", "DPO"],
    featured: false,
  },
  {
    id: "3",
    slug: "gradient-boosting-xgboost",
    title: "Gradient Boosting Under the Hood: From AdaBoost to XGBoost",
    excerpt:
      "Gradient boosting wins Kaggle and production deployments for tabular data. I derive it from first principles — gradient descent in function space — then explain XGBoost's second-order innovations that make it 10–100× faster.",
    date: "2024-08-20",
    category: "Machine Learning",
    readTime: 17,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["XGBoost", "Gradient Boosting", "Ensemble Methods", "Decision Trees"],
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  "Deep Learning": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "AI & LLMs": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "Machine Learning": "bg-green-500/15 text-green-400 border-green-500/30",
  "Remote Sensing": "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BlogSection = () => {
  const featured = blogPosts.find((p) => p.featured)!;
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <section id="blog" className="relative py-24 px-6 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/4 rounded-full blur-[100px]" />
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
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20 mb-4">
            Technical Writing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Articles &amp; <span className="text-gradient">Formations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des explications approfondies sur l'IA, le machine learning et le deep learning —
            rigoureuses, visuelles et orientées code.
          </p>
        </motion.div>

        {/* Featured article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <Link to={`/blog/${featured.slug}`} className="group block">
            <div className="relative rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-[var(--shadow-glow)]">
              {/* Image */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,7%)] via-[hsl(220,20%,7%)/60%] to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground">
                  Featured
                </span>
              </div>
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold border ${categoryColors[featured.category]}`}>
                    {featured.category}
                  </span>
                  <span className="text-muted-foreground text-xs font-mono flex items-center gap-1">
                    <Calendar size={11} />
                    {new Date(featured.date).toLocaleDateString("fr-FR")}
                  </span>
                  <span className="text-muted-foreground text-xs font-mono flex items-center gap-1">
                    <Clock size={11} />
                    {featured.readTime} min
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                  {featured.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mb-4 hidden sm:block line-clamp-2">
                  {featured.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-card/80 rounded text-xs font-mono text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Grid of other articles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {rest.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <div className="relative overflow-hidden rounded-xl border border-border/50 hover:border-primary/50 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 h-full flex flex-col hover:shadow-[var(--shadow-glow-sm)]">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-500" />

                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold border ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {new Date(post.date).toLocaleDateString("fr-FR")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime} min
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors flex-grow">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Tags + CTA */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono text-primary border border-primary/20 bg-primary/5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-primary text-sm font-semibold mt-auto">
                      Lire l&apos;article
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground font-mono border-t border-border/40 pt-8"
        >
          <span>{blogPosts.length} articles publiés</span>
          <span className="hidden sm:inline text-border/60">·</span>
          <span>Deep Learning · Machine Learning · LLMs</span>
          <span className="hidden sm:inline text-border/60">·</span>
          <span>Toutes les références académiques incluses</span>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
