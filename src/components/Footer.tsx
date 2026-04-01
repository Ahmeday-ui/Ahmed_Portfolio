import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import { motion } from "framer-motion";
import NewsletterSection from "./NewsletterSection";

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Newsletter */}
        <div className="mb-12">
          <NewsletterSection />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a href="#hero" className="font-display text-2xl font-bold text-gradient">
              AA<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Data Scientist & IA — Transformer les données en décisions intelligentes.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/in/ahmed-ayoubi/", label: "LinkedIn" },
              { icon: Github, href: "https://github.com/Ahmeday-ui", label: "GitHub" },
              { icon: Mail, href: "mailto:ayoubiahmed02@gmail.com", label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel={s.label !== "Email" ? "noopener noreferrer" : undefined}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 border border-border transition-all hover:scale-110"
                aria-label={s.label}
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} Ahmed Ayoubi · Fait avec <Heart size={12} className="text-primary fill-primary" /> et beaucoup de café
          </p>
          <motion.a
            href="#hero"
            whileHover={{ y: -2 }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowUp size={14} /> Retour en haut
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
