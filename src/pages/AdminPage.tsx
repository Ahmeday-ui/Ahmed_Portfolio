import { useState } from "react";
import AccessRequestDashboard from "@/components/AccessRequestDashboard";
import { Button } from "@/components/ui/button";
import { Lock, LogOut, Menu, X } from "lucide-react";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("admin_authenticated") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  // Password simple (à personnaliser - idéalement avec vrai auth)
  const ADMIN_PASSWORD = "Ahmed2024!Ayoubi"; // À changer!

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      setPassword("");
    } else {
      setError("Mot de passe incorrect");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Accès sécurisé aux demandes de projets</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                  autoFocus
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Se connecter
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Accès réservé aux administrateurs
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Dashboard Admin</h1>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ahmed Ayoubi</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {showMenu && (
          <div className="md:hidden border-t border-border bg-card/50 px-6 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <AccessRequestDashboard />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          <p>Ahmed Ayoubi Portfolio - Admin Dashboard</p>
          <p className="mt-2 text-xs">
            Pour intégrer les vrais emails, consultez le guide dans SETUP_GUIDE.md
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
