import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Me <span className="text-gradient">contacter</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-8 mx-auto" />
          <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto">
            Intéressé par une collaboration ou un échange ? N'hésitez pas à me contacter.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Mail, label: "Email", value: "ayoubiahmed02@gmail.com", href: "mailto:ayoubiahmed02@gmail.com" },
            { icon: Phone, label: "Téléphone", value: "07 65 23 73 98", href: "tel:+33765237398" },
            { icon: MapPin, label: "Localisation", value: "Aubière 63170, France", href: "#" },
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/10 group block text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all">
                <item.icon size={24} className="text-primary group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-sm text-foreground font-medium">{item.value}</p>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-8 rounded-2xl bg-card border border-border relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <p className="text-muted-foreground mb-6 relative">Retrouvez-moi sur les réseaux professionnels</p>
          <div className="flex flex-wrap items-center justify-center gap-4 relative">
            <motion.a
              href="https://www.linkedin.com/in/ahmed-ayoubi/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0077B5]/10 text-[#0077B5] border border-[#0077B5]/20 hover:bg-[#0077B5]/20 transition-all text-sm font-medium"
            >
              <Linkedin size={18} /> LinkedIn
            </motion.a>
            <motion.a
              href="https://github.com/Ahmeday-ui"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-secondary border border-border hover:border-primary/30 transition-all text-sm font-medium text-foreground"
            >
              <Github size={18} /> GitHub
            </motion.a>
            <motion.a
              href="mailto:ayoubiahmed02@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Send size={16} /> Envoyer un email
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
