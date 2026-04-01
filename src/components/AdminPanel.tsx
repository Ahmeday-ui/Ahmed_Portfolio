import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Users, FileText, Clock, Trash2, Shield, Lock, CheckCircle, XCircle, ExternalLink } from "lucide-react";

interface AccessRequest {
  id: string;
  nom?: string;
  prenom?: string;
  organisation?: string;
  typeOrg?: string;
  email?: string;
  timestamp: string;
  project?: string;
  status?: "pending" | "approved" | "rejected";
  targetUrl?: string;
  action?: string;
  page?: string;
  userAgent?: string;
}

const ADMIN_CODE = "ahmed2026";

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [visitors, setVisitors] = useState<AccessRequest[]>([]);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
  const [tab, setTab] = useState<"visitors" | "requests">("requests");

  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [isAuthenticated]);

  useEffect(() => {
    const visits = JSON.parse(localStorage.getItem("site_visitors") || "[]");
    visits.push({
      timestamp: new Date().toISOString(),
      action: "page_view",
      page: window.location.pathname + window.location.hash,
      userAgent: navigator.userAgent,
    });
    localStorage.setItem("site_visitors", JSON.stringify(visits));
  }, []);

  const loadData = () => {
    setVisitors(JSON.parse(localStorage.getItem("site_visitors") || "[]"));
    setAccessRequests(JSON.parse(localStorage.getItem("access_requests") || "[]"));
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      setIsAuthenticated(true);
      setCode("");
    }
  };

  const updateRequestStatus = (id: string, status: "approved" | "rejected") => {
    const requests: AccessRequest[] = JSON.parse(localStorage.getItem("access_requests") || "[]");
    const updated = requests.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem("access_requests", JSON.stringify(updated));
    setAccessRequests(updated);
  };

  const clearData = (type: "visitors" | "requests") => {
    if (type === "visitors") {
      localStorage.removeItem("site_visitors");
      setVisitors([]);
    } else {
      localStorage.removeItem("access_requests");
      setAccessRequests([]);
    }
  };

  const pageViews = visitors.filter((v) => v.action === "page_view");
  const pendingRequests = accessRequests.filter(r => r.status === "pending");
  const approvedRequests = accessRequests.filter(r => r.status === "approved");
  const rejectedRequests = accessRequests.filter(r => r.status === "rejected");

  const statusBadge = (status?: string) => {
    switch (status) {
      case "approved": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-[10px] font-semibold"><CheckCircle size={10} /> Approuvé</span>;
      case "rejected": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/15 text-destructive text-[10px] font-semibold"><XCircle size={10} /> Refusé</span>;
      default: return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 text-[10px] font-semibold"><Clock size={10} /> En attente</span>;
    }
  };

  return (
    <>
      <div
        className="fixed bottom-0 left-0 w-8 h-8 z-[70] cursor-default"
        onDoubleClick={() => setIsOpen(true)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
            onClick={() => { setIsOpen(false); setIsAuthenticated(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-primary" />
                  <h3 className="font-display font-bold text-foreground">Panneau Admin</h3>
                </div>
                <button onClick={() => { setIsOpen(false); setIsAuthenticated(false); }} className="p-1.5 rounded-full hover:bg-secondary transition-colors">
                  <X size={16} />
                </button>
              </div>

              {!isAuthenticated ? (
                <form onSubmit={handleAuth} className="p-8 text-center">
                  <Lock size={32} className="text-primary mx-auto mb-4" />
                  <h4 className="font-display font-semibold text-foreground mb-2">Accès restreint</h4>
                  <p className="text-sm text-muted-foreground mb-4">Entrez le code administrateur</p>
                  <input
                    type="password"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Code secret"
                    className="w-full max-w-xs mx-auto px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                    autoFocus
                  />
                  <button type="submit" className="block mx-auto mt-3 px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                    Connexion
                  </button>
                </form>
              ) : (
                <div className="flex flex-col h-[calc(80vh-60px)]">
                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-3 p-4 border-b border-border">
                    <div className="p-3 rounded-xl bg-secondary/50 text-center">
                      <Eye size={16} className="text-primary mx-auto mb-1" />
                      <div className="text-lg font-bold text-foreground">{pageViews.length}</div>
                      <div className="text-[10px] text-muted-foreground">Visites</div>
                    </div>
                    <div className="p-3 rounded-xl bg-yellow-500/10 text-center">
                      <Clock size={16} className="text-yellow-400 mx-auto mb-1" />
                      <div className="text-lg font-bold text-foreground">{pendingRequests.length}</div>
                      <div className="text-[10px] text-muted-foreground">En attente</div>
                    </div>
                    <div className="p-3 rounded-xl bg-green-500/10 text-center">
                      <CheckCircle size={16} className="text-green-400 mx-auto mb-1" />
                      <div className="text-lg font-bold text-foreground">{approvedRequests.length}</div>
                      <div className="text-[10px] text-muted-foreground">Approuvés</div>
                    </div>
                    <div className="p-3 rounded-xl bg-destructive/10 text-center">
                      <XCircle size={16} className="text-destructive mx-auto mb-1" />
                      <div className="text-lg font-bold text-foreground">{rejectedRequests.length}</div>
                      <div className="text-[10px] text-muted-foreground">Refusés</div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 p-2 border-b border-border">
                    <button
                      onClick={() => setTab("requests")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === "requests" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Demandes ({accessRequests.length})
                    </button>
                    <button
                      onClick={() => setTab("visitors")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === "visitors" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Visiteurs ({pageViews.length})
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-4">
                    {tab === "requests" ? (
                      <div className="space-y-3">
                        {accessRequests.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-8">Aucune demande d'accès</p>
                        )}
                        {[...accessRequests].reverse().map((r) => (
                          <div key={r.id || r.timestamp} className="p-4 rounded-xl border border-border bg-secondary/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-sm text-foreground">{r.prenom} {r.nom}</span>
                              <div className="flex items-center gap-2">
                                {statusBadge(r.status)}
                                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                  <Clock size={10} /> {new Date(r.timestamp).toLocaleString("fr-FR")}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1 text-xs text-muted-foreground mb-3">
                              <div>📧 {r.email}</div>
                              <div>🏢 {r.organisation} ({r.typeOrg})</div>
                              <div>📄 Projet : <span className="text-primary font-medium">{r.project}</span></div>
                            </div>
                            
                            {/* Action buttons */}
                            {r.status === "pending" && (
                              <div className="flex items-center gap-2 pt-2 border-t border-border">
                                <button
                                  onClick={() => updateRequestStatus(r.id, "approved")}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/15 text-green-400 text-xs font-medium hover:bg-green-500/25 transition-colors"
                                >
                                  <CheckCircle size={12} /> Approuver
                                </button>
                                <button
                                  onClick={() => updateRequestStatus(r.id, "rejected")}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/15 text-destructive text-xs font-medium hover:bg-destructive/25 transition-colors"
                                >
                                  <XCircle size={12} /> Refuser
                                </button>
                                {r.targetUrl && (
                                  <a
                                    href={r.targetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto flex items-center gap-1 text-[10px] text-primary hover:underline"
                                  >
                                    <ExternalLink size={10} /> Voir le projet
                                  </a>
                                )}
                              </div>
                            )}
                            {r.status === "approved" && (
                              <div className="flex items-center gap-2 pt-2 border-t border-border">
                                <button
                                  onClick={() => updateRequestStatus(r.id, "rejected")}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/15 text-destructive text-xs font-medium hover:bg-destructive/25 transition-colors"
                                >
                                  <XCircle size={12} /> Révoquer l'accès
                                </button>
                              </div>
                            )}
                            {r.status === "rejected" && (
                              <div className="flex items-center gap-2 pt-2 border-t border-border">
                                <button
                                  onClick={() => updateRequestStatus(r.id, "approved")}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/15 text-green-400 text-xs font-medium hover:bg-green-500/25 transition-colors"
                                >
                                  <CheckCircle size={12} /> Approuver finalement
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {pageViews.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-8">Aucune visite enregistrée</p>
                        )}
                        {[...pageViews].reverse().map((v, i) => (
                          <div key={i} className="p-3 rounded-lg border border-border bg-secondary/30 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="flex items-center gap-1.5 text-foreground font-medium">
                                <Eye size={12} className="text-primary" /> Page visitée
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Clock size={10} /> {new Date(v.timestamp).toLocaleString("fr-FR")}
                              </span>
                            </div>
                            <div className="text-muted-foreground truncate">{v.page}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-3 border-t border-border flex justify-end">
                    <button
                      onClick={() => clearData(tab === "visitors" ? "visitors" : "requests")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 size={12} /> Effacer {tab === "visitors" ? "les visites" : "les demandes"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;
