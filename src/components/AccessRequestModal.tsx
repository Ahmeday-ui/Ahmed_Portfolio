import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, User, Building2, Mail, CheckCircle, Shield, Clock } from "lucide-react";

interface AccessRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  targetUrl: string;
}

interface AccessRequest {
  id: string;
  nom: string;
  prenom: string;
  organisation: string;
  typeOrg: string;
  email: string;
  timestamp: string;
  project: string;
  status: "pending" | "approved" | "rejected";
  targetUrl: string;
}

// Check if user already has approved access
const hasApprovedAccess = (email: string, project: string): boolean => {
  const requests: AccessRequest[] = JSON.parse(localStorage.getItem("access_requests") || "[]");
  return requests.some(r => r.email === email && r.project === project && r.status === "approved");
};

const AccessRequestModal = ({ isOpen, onClose, projectTitle, targetUrl }: AccessRequestModalProps) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [typeOrg, setTypeOrg] = useState("université");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadyApproved, setAlreadyApproved] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nom.trim() || !prenom.trim() || !organisation.trim() || !email.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    // Check if already approved
    if (hasApprovedAccess(email, projectTitle)) {
      setAlreadyApproved(true);
      setTimeout(() => {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
        handleClose();
      }, 1500);
      return;
    }

    // Check if already pending
    const existing: AccessRequest[] = JSON.parse(localStorage.getItem("access_requests") || "[]");
    const alreadyPending = existing.some(r => r.email === email && r.project === projectTitle && r.status === "pending");
    
    if (!alreadyPending) {
      const request: AccessRequest = {
        id: crypto.randomUUID(),
        nom,
        prenom,
        organisation,
        typeOrg,
        email,
        timestamp: new Date().toISOString(),
        project: projectTitle,
        status: "pending",
        targetUrl,
      };
      existing.push(request);
      localStorage.setItem("access_requests", JSON.stringify(existing));

      // Track visit
      const visits = JSON.parse(localStorage.getItem("site_visitors") || "[]");
      visits.push({
        ...request,
        action: "report_access",
      });
      localStorage.setItem("site_visitors", JSON.stringify(visits));
    }

    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setSubmitted(false);
    setAlreadyApproved(false);
    setNom("");
    setPrenom("");
    setOrganisation("");
    setEmail("");
    setError("");
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary/20 to-primary/5 p-6 border-b border-border">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-background/50 hover:bg-background/80 text-foreground transition-colors"
              >
                <X size={16} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">Demande d'accès</h3>
                  <p className="text-xs text-muted-foreground">Contenu protégé — identification requise</p>
                </div>
              </div>
            </div>

            {alreadyApproved ? (
              <div className="p-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                  <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                </motion.div>
                <h4 className="font-display font-semibold text-foreground mb-2">Accès déjà approuvé !</h4>
                <p className="text-sm text-muted-foreground">Redirection vers le document en cours...</p>
              </div>
            ) : submitted ? (
              <div className="p-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                  <Clock size={48} className="text-primary mx-auto mb-4" />
                </motion.div>
                <h4 className="font-display font-semibold text-foreground mb-2">Demande envoyée !</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Votre demande d'accès pour <span className="font-semibold text-foreground">"{projectTitle}"</span> a été soumise avec succès.
                </p>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">⏳ En attente d'approbation</p>
                  <p>Vous recevrez l'accès une fois votre demande validée par l'administrateur.</p>
                </div>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <p className="text-xs text-muted-foreground mb-2">
                  Pour consulter <span className="font-semibold text-foreground">"{projectTitle}"</span>, veuillez vous identifier :
                </p>

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <User size={12} /> Nom
                    </label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="AYOUBI" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <User size={12} /> Prénom
                    </label>
                    <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Ahmed" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                    <Building2 size={12} /> Type d'organisation
                  </label>
                  <select value={typeOrg} onChange={(e) => setTypeOrg(e.target.value)} className={inputClass}>
                    <option value="université">Université</option>
                    <option value="entreprise">Entreprise</option>
                    <option value="laboratoire">Laboratoire de recherche</option>
                    <option value="autre">Autre organisation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                    <Building2 size={12} /> Nom de l'organisation
                  </label>
                  <input type="text" value={organisation} onChange={(e) => setOrganisation(e.target.value)} placeholder="Université Clermont Auvergne" className={inputClass} />
                </div>

                <div>
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                    <Mail size={12} /> Adresse e-mail
                  </label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre.email@exemple.com" className={inputClass} />
                </div>

                <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <Lock size={14} /> Demander l'accès
                </button>

                <p className="text-[10px] text-muted-foreground text-center">
                  Vos informations sont utilisées uniquement pour le suivi des accès.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccessRequestModal;
