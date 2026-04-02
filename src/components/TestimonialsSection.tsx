import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Testimonial {
  name: string;
  title: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Youssef BOUYRIG",
    title: "Head of Insights and Data",
    company: "Capgemini-Casablanca-Maroc",
    text: "Ahmed a démontré une expertise exceptionnelle en Data Science et Machine Learning. Son travail sur les algorithmes de vérification et de nettoyage de données en environnement Azure Cloud, avec une réduction des erreurs de saisie de 95 % a dépassé toutes nos attentes. Une rigueur scientifique exemplaire combinée à une grande capacité d'adaptation.",
    rating: 5,
    avatar: "YB",
  },
  {
    name: "Eric Guillerme",
    title: "Chef Projet Tech/IA Data",
    company: "Cikaba-Clermont Ferrand",
    text: "Un développeur passionné et rigoureux. Sa capacité à transformer des concepts complexes en solutions pragmatiques est remarquable. Ahmed apporte une vraie valeur ajoutée sur les projets IA et fait preuve d'une grande autonomie.",
    rating: 5,
    avatar: "EG",
  },
  {
    name: "Julien Ah-Pine",
    title: "Professeur des Universités",
    company: "Sigma Clermont Auvergne & LIMOS",
    text: "Ses contributions à la recherche en IA ont été précieuses. Une rigueur scientifique exemplaire, une grande curiosité intellectuelle et une excellente capacité à communiquer des concepts avancés. Ahmed représente la nouvelle génération de chercheurs en IA.",
    rating: 5,
    avatar: "JA",
  },
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section id="testimonials" className="relative py-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-[100px]" />
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
            Ce que disent mes <span className="text-gradient">collaborateurs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Retours authentiques de professionnels avec qui j'ai travaillé
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="relative h-full bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-card/60 transition-all duration-300 p-6 flex flex-col">
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 text-primary/20" size={24} />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-foreground mb-6 flex-grow italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-sm font-bold text-background">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.title} @ {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
