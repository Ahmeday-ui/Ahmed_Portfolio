import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, Mail, User, Building2, ExternalLink, Trash2, Shield, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { sendAccessNotification } from "@/lib/accessRequestService";

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

const AccessRequestDashboard = () => {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [showNotification, setShowNotification] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Charger les demandes depuis localStorage
  useEffect(() => {
    loadRequests();
    // Vérifier les nouvelles demandes toutes les 5 secondes
    const interval = setInterval(loadRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadRequests = () => {
    const stored = localStorage.getItem("access_requests");
    if (stored) {
      const parsed = JSON.parse(stored);
      setRequests(parsed);
      // Afficher notification si nouvelles demandes
      const pending = parsed.filter((r: AccessRequest) => r.status === "pending");
      if (pending.length > 0) {
        setShowNotification(true);
      }
    }
  };

  const handleApprove = async (request: AccessRequest) => {
    setSendingId(request.id);
    
    try {
      // Envoyer l'email via EmailJS
      const emailSent = await sendAccessNotification(
        request.email,
        `${request.prenom} ${request.nom}`,
        request.project,
        "approved"
      );

      // Mettre à jour le statut
      const updated = requests.map((r) =>
        r.id === request.id ? { ...r, status: "approved" as const } : r
      );
      setRequests(updated);
      localStorage.setItem("access_requests", JSON.stringify(updated));

      toast({
        title: emailSent ? "✅ Accès approuvé" : "✅ Accès approuvé (email non envoyé)",
        description: emailSent 
          ? `Email d'approbation envoyé à ${request.email}`
          : `Vérifiez votre configuration EmailJS. Le statut a été approuvé.`,
      });
    } catch (error) {
      console.error("Erreur lors de l'approbation:", error);
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors de l'approbation",
        variant: "destructive",
      });
    } finally {
      setSendingId(null);
    }
  };

  const handleReject = async (request: AccessRequest) => {
    setSendingId(request.id);
    
    try {
      // Envoyer l'email via EmailJS
      const emailSent = await sendAccessNotification(
        request.email,
        `${request.prenom} ${request.nom}`,
        request.project,
        "rejected"
      );

      // Mettre à jour le statut
      const updated = requests.map((r) =>
        r.id === request.id ? { ...r, status: "rejected" as const } : r
      );
      setRequests(updated);
      localStorage.setItem("access_requests", JSON.stringify(updated));

      toast({
        title: emailSent ? "❌ Accès refusé" : "❌ Accès refusé (email non envoyé)",
        description: emailSent
          ? `Email de refus envoyé à ${request.email}`
          : `Vérifiez votre configuration EmailJS. Le statut a été refusé.`,
        variant: "destructive",
      });
    } catch (error) {
      console.error("Erreur lors du refus:", error);
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors du refus",
        variant: "destructive",
      });
    } finally {
      setSendingId(null);
    }
  };

  const handleDelete = (id: string) => {
    const updated = requests.filter((r) => r.id !== id);
    setRequests(updated);
    localStorage.setItem("access_requests", JSON.stringify(updated));
    toast({
      title: "Supprimé",
      description: "La demande a été supprimée",
    });
  };

  const filtered = requests.filter((r) =>
    filter === "all" ? true : r.status === filter
  );

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">Demandes d'Accès Projets</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total", value: stats.total, color: "bg-slate-500/20" },
            { label: "En attente", value: stats.pending, color: "bg-yellow-500/20" },
            { label: "Approuvées", value: stats.approved, color: "bg-green-500/20" },
            { label: "Refusées", value: stats.rejected, color: "bg-red-500/20" },
          ].map((stat, i) => (
            <Card key={i} className={`${stat.color} border-0 p-4 text-center`}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f === "pending" && <Clock className="w-4 h-4 mr-2" />}
              {f === "approved" && <Check className="w-4 h-4 mr-2" />}
              {f === "rejected" && <X className="w-4 h-4 mr-2" />}
              {f === "all" ? "Tous" : f}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Notification Badge */}
      <AnimatePresence>
        {showNotification && stats.pending > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 flex items-center gap-3"
          >
            <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-yellow-200">
                {stats.pending} demande{stats.pending > 1 ? "s" : ""} en attente d'approbation
              </p>
              <p className="text-sm text-yellow-200/70">Vérifiez et approuvez ou refusez les demandes</p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="ml-auto text-yellow-500 hover:text-yellow-400"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Requests List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="p-8 text-center border-dashed">
            <p className="text-muted-foreground">Aucune demande trouvée</p>
          </Card>
        ) : (
          filtered.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`p-4 border-l-4 ${
                request.status === "pending"
                  ? "border-l-yellow-500 bg-yellow-500/5"
                  : request.status === "approved"
                  ? "border-l-green-500 bg-green-500/5"
                  : "border-l-red-500 bg-red-500/5"
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Info */}
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      {request.prenom} {request.nom}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{request.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{request.organisation}</span>
                      </div>
                      <div>
                        <span className="capitalize text-xs bg-secondary px-2 py-1 rounded">
                          {request.typeOrg}
                        </span>
                      </div>
                      <div className="text-xs">
                        {new Date(request.timestamp).toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Projet:</span> {request.project}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap md:flex-col">
                    {request.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none disabled:opacity-50"
                          onClick={() => handleApprove(request)}
                          disabled={sendingId !== null}
                        >
                          {sendingId === request.id ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              Envoi...
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Approuver
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1 md:flex-none disabled:opacity-50"
                          onClick={() => handleReject(request)}
                          disabled={sendingId !== null}
                        >
                          {sendingId === request.id ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              Envoi...
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4 mr-1" />
                              Refuser
                            </>
                          )}
                        </Button>
                      </>
                    )}

                    {request.status === "approved" && (
                      <span className="px-3 py-1 text-sm bg-green-500/20 text-green-400 rounded-full flex items-center gap-1 w-full md:w-auto justify-center">
                        <Check className="w-4 h-4" />
                        Approuvé
                      </span>
                    )}

                    {request.status === "rejected" && (
                      <span className="px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded-full flex items-center gap-1 w-full md:w-auto justify-center">
                        <X className="w-4 h-4" />
                        Refusé
                      </span>
                    )}

                    <button
                      onClick={() => handleDelete(request.id)}
                      className="p-2 hover:bg-red-500/20 rounded text-red-500 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Email Preview */}
      {filtered.length > 0 && (
        <Card className="p-4 border-dashed bg-slate-500/5">
          <p className="text-xs text-muted-foreground mb-2 uppercase font-semibold">
            ✅ EmailJS est configuré et actif!
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Service ID: <code className="text-primary">service_9i0zjjv</code></li>
            <li>Template Approbation: <code className="text-primary">template_zlwagno</code></li>
            <li>Template Refus: <code className="text-primary">template_1g91sxy</code></li>
            <li>Les emails sont envoyés automatiquement lors de l'approbation/refus</li>
            <li>Vérifiez votre boîte email pour confirmer la réception des emails</li>
          </ul>
        </Card>
      )}
    </div>
  );
};

export default AccessRequestDashboard;
