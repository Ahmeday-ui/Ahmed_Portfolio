import { motion } from "framer-motion";
import { Mail, FileText, Zap, Award, Code2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CTASection = () => {
  const benefits: Benefit[] = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Télécharger mon CV",
      description: "CV complet avec toutes les compétences et expériences",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Me contacter",
      description: "Discutons de votre projet ou opportunity",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Collaboration",
      description: "Parlons de vos besoins en Data Science/IA",
    },
  ];

  const achievements = [
    { number: "8+", label: "Projets majeurs" },
    { number: "3+", label: "Années d'expérience" },
    { number: "5", label: "Certifications" },
    { number: "100%", label: "Client satisfaction" },
  ];

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Stats & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/40 backdrop-blur-sm border-border/50 p-4 text-center hover:border-primary/50 transition-colors">
                    <p className="text-2xl md:text-3xl font-bold text-gradient">{achievement.number}</p>
                    <p className="text-xs text-muted-foreground mt-2">{achievement.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{benefit.title}</h4>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Main CTA */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Prêt à <span className="text-gradient">collaborer</span>?
              </h2>
              <p className="text-lg text-muted-foreground">
                Que vous ayez un projet ambitieux ou que vous cherchiez un data scientist/ML engineer, je suis là pour discuter de comment je peux vous aider.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {["Data Science", "Deep Learning", "ML Engineering", "Télédétection"].map((badge, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 border border-primary/20 text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {badge}
                </motion.span>
              ))}
            </div>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.a
                href="/cv.pdf"
                download
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group" size="lg">
                  <FileText className="mr-2 w-5 h-5" />
                  Télécharger mon CV
                </Button>
              </motion.a>

              <motion.a
                href="#contact"
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" className="w-full group" size="lg">
                  <Mail className="mr-2 w-5 h-5" />
                  Me contacter
                </Button>
              </motion.a>
            </div>

            {/* Secondary CTA */}
            <motion.div
              className="p-4 rounded-lg bg-secondary/40 border border-border/50"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                Vous cherchez quelque chose de plus précis? <a href="#contact" className="text-primary hover:underline font-semibold">Parlez-moi de votre besoin</a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
