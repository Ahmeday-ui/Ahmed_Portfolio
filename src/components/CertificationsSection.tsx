import { motion } from "framer-motion";
import { Award, ExternalLink, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const certifications = [
  {
    title: "OpenBadge Certification",
    issuer: "Grenoble",
    date: "2026",
    status: "Obtenu",
    description: "Professional certification for Data Science and AI expertise",
    badgeUrl: "https://openbadgefactory.com/obv3/credentials/59ae18f2748c3aa377df86f68c096dfb80a3bc0c.html",
    color: "from-blue-600 to-cyan-600",
    skills: ["Data Science", "AI", "Machine Learning"],
    isBadge: true,
  },
];

const upcomingCertifications = [
  {
    title: "Advanced Machine Learning",
    issuer: "Professional Development",
    date: "2025",
    status: "En cours (Durée: 1 an)",
    description: "Deep Learning and Neural Networks specialization",
    color: "from-purple-600 to-pink-600",
    skills: ["Deep Learning", "Neural Networks", "TensorFlow"],
    progress: 75,
  },
  {
    title: "Data Engineering Expert",
    issuer: "Industry Recognition",
    date: "2025",
    status: "En cours (Durée: 1 an)",
    description: "Big Data and Data Pipeline Architecture",
    color: "from-orange-600 to-red-600",
    skills: ["Big Data", "ETL", "Cloud Computing"],
    progress: 70,
  },
];

export const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 px-4 md:px-8 bg-background relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-6 h-6 text-primary" />
            <span className="text-primary font-display text-sm tracking-widest uppercase">
              Achievements
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Certifications & Badges
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and recognized credentials in Data Science, AI, and Machine Learning
          </p>
        </motion.div>

        {/* Obtained Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-display font-bold text-foreground mb-8 flex items-center gap-2">
            <Award className="w-5 h-5 text-green-500" />
            Certifications Obtenues
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Card with gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300`} />

                <div className="relative bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
                  {/* Certification Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center`}>
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      {cert.isBadge && (
                        <span className="text-xs font-bold px-3 py-1 bg-green-500/20 text-green-500 rounded-full">
                          {cert.status}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground/80 mb-4">
                    {cert.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer with Date and Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground font-medium">
                      {cert.date}
                    </span>
                    <a
                      href={cert.badgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      View Badge
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Certifications */}
        <div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-8 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            En Cours de Passage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingCertifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Card with gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300`} />

                <div className="relative bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
                  {/* Certification Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center`}>
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full">
                        {cert.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground/80 mb-4">
                    {cert.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cert.skills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-foreground">Progression</span>
                      <span className="text-xs font-bold text-primary">{cert.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cert.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className={`h-full bg-gradient-to-r ${cert.color}`}
                      />
                    </div>
                  </div>

                  {/* Footer with Date */}
                  <div className="pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground font-medium">
                      {cert.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Continuously learning and earning industry-recognized certifications
          </p>
          <a
            href="https://openbadgefactory.com/obv3/credentials/59ae18f2748c3aa377df86f68c096dfb80a3bc0c.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            View My OpenBadge Certification
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
