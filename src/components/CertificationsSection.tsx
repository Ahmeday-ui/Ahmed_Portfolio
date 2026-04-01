import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const certifications = [
  {
    title: "OpenBadge Certification",
    issuer: "OpenBadgeFactory",
    date: "2024",
    description: "Professional certification for Data Science and AI expertise",
    badgeUrl: "https://openbadgefactory.com/obv3/credentials/59ae18f2748c3aa377df86f68c096dfb80a3bc0c.html",
    color: "from-blue-600 to-cyan-600",
    skills: ["Data Science", "AI", "Machine Learning"],
  },
  {
    title: "Advanced Machine Learning",
    issuer: "Professional Development",
    date: "2023",
    description: "Deep Learning and Neural Networks specialization",
    badgeUrl: "#",
    color: "from-purple-600 to-pink-600",
    skills: ["Deep Learning", "Neural Networks", "TensorFlow"],
  },
  {
    title: "Data Engineering Expert",
    issuer: "Industry Recognition",
    date: "2023",
    description: "Big Data and Data Pipeline Architecture",
    badgeUrl: "#",
    color: "from-orange-600 to-red-600",
    skills: ["Big Data", "ETL", "Cloud Computing"],
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

        {/* Certifications Grid */}
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
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    className={`inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors ${
                      cert.badgeUrl === "#" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    View Badge
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
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
            View My OpenBadge
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
