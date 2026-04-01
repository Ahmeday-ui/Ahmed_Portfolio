import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSubscribed(true);
      setEmail("");
      
      toast({
        title: "Succès! 🎉",
        description: "Vous avez été abonné à la newsletter. Merci!",
      });

      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'abonnement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="relative py-8 px-6 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Background elements */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="max-w-2xl mx-auto">
          {!isSubscribed ? (
            <>
              <h3 className="text-xl font-bold mb-2">Restez à jour 📬</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Recevez les derniers articles sur ML, IA et data science directement dans votre boîte mail.
              </p>

              <form onSubmit={handleSubscribe} className="flex gap-2 flex-col sm:flex-row">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Abonnement...
                    </>
                  ) : (
                    "S'abonner"
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-2">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block mb-2"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mx-auto">
                  <span className="text-green-500 text-lg">✓</span>
                </div>
              </motion.div>
              <p className="font-semibold text-sm">Merci de votre abonnement!</p>
              <p className="text-xs text-muted-foreground mt-1">Bienvenue dans notre communauté 🚀</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsletterSection;
