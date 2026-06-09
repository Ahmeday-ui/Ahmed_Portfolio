import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Index from "./pages/Index.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import NotFound from "./pages/NotFound.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import ThemeEffects from "./components/ThemeEffects.tsx";
import ThemeSwitcher from "./components/ThemeSwitcher.tsx";
import Cursor from "./components/Cursor.tsx";

const queryClient = new QueryClient();

// Declare gtag for TypeScript
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

// Initialize Google Analytics
const initializeAnalytics = () => {
  const scriptId = "google-analytics";
  if (document.getElementById(scriptId)) return;

  const GA_ID = "G-JPMFE1X5MJ";
  if (GA_ID && GA_ID.startsWith("G-")) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID);
  }
};

const App = () => {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ThemeProvider>
          {/* Global visual effects (canvas/rain) based on active theme */}
          <ThemeEffects />
          {/* Custom cursor — desktop only */}
          <Cursor />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          {/* Floating theme picker — visible on all pages */}
          <ThemeSwitcher />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
