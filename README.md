*Ahmed Ayoubi - Data Scientist & ML Engineer Portfolio*

*Description*

Bienvenue sur mon portfolio! Ce site présente mon expertise en Data Science, Machine Learning et Deep Learning. Vous y trouverez une collection complète de mes projets professionnels, recherches académiques, et contributions à des projets d'impact R&D.

Le portfolio est construit avec les technologies modernes pour offrir une expérience utilisateur fluide et interactive.

*Table des Matières*

1. Caractéristiques principales
2. Stack technologique
3. Installation et configuration
4. Structure du projet
5. Système de demandes d'accès
6. Configuration Google Analytics
7. Configuration EmailJS
8. Déploiement
9. Contact et ressources

*Caractéristiques Principales*

- Portfolio interactif avec animations fluides
- Section de projets avec demandes d'accès sécurisées
- Dashboard admin pour gérer les demandes d'accès
- Système de notifications par email (EmailJS)
- Google Analytics intégré
- Newsletter abonnements
- Section testimonials de collaborateurs
- Blog avec articles scientifiques
- CTA prominent pour les opportunités
- Design responsive (mobile + desktop)
- Thème sombre moderne avec Tailwind CSS

*Stack Technologique*

Frontend:
- React 18+ avec TypeScript
- Vite pour le build et dev
- Tailwind CSS pour le styling
- Framer Motion pour les animations
- Shadcn UI pour les composants
- React Router pour la navigation
- React Hook Form pour les formulaires

Services et Intégrations:
- EmailJS pour les notifications par email
- Google Analytics 4 pour le suivi des visiteurs
- Supabase pour la base de données (optionnel)
- localStorage pour le stockage temporaire

Tests et Qualité:
- Vitest pour les tests unitaires
- Playwright pour les tests E2E
- ESLint pour la qualité du code

*Installation et Configuration*

Prérequis:
- Node.js v18+
- npm v9+
- Compte EmailJS (gratuit)
- Google Analytics ID (gratuit)

Étapes d'installation:

1. Clonez le repository
   git clone <votre-repo>
   cd Ahmed_Portfolio

2. Installez les dépendances
   npm install

3. Configurez les variables d'environnement
   Créez un fichier .env.local à la racine:
   VITE_SUPABASE_URL=votre_url_supabase
   VITE_SUPABASE_PUBLISHABLE_KEY=votre_clé_supabase

4. Lancez le serveur de développement
   npm run dev
   Le site sera accessible à http://localhost:8080/

5. Construisez pour la production
   npm run build

*Structure du Projet*

```
Ahmed_Portfolio/
├── src/
│   ├── components/          # Composants React
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── NewsletterSection.tsx
│   │   ├── AccessRequestModal.tsx
│   │   ├── AccessRequestDashboard.tsx
│   │   └── ui/              # Composants Shadcn UI
│   ├── pages/               # Pages principales
│   │   ├── Index.tsx
│   │   ├── AdminPage.tsx
│   │   └── NotFound.tsx
│   ├── hooks/               # Hooks personnalisés
│   ├── lib/                 # Utilitaires et services
│   │   ├── accessRequestService.ts
│   │   └── utils.ts
│   ├── Integrations et supabase/  # Configuration Supabase
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                  # Fichiers statiques
│   ├── cv.pdf               # Votre CV
│   └── assets/              # Images et ressources
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

*Système de Demandes d'Accès*

Le système gère les demandes d'accès aux projets protégés de manière sécurisée.

Flowchart du processus:

```
Utilisateur
    |
    | Clique sur projet protégé
    v
Modal de demande d'accès
    |
    | Remplit: Nom, Prénom, Email, Organisation
    |
    v
Validation des données
    |
    | Email valide?
    | Tous les champs remplis?
    |
    +--> Non: Erreur affichée
    |
    +--> Oui: Demande stockée
    |
    v
localStorage + Notification
    |
    +--> Admin reçoit notification (optionnel)
    |
    v
Admin Dashboard (/admin)
    |
    | Password requis
    |
    v
Vue des demandes en attente
    |
    +---> Approuver
    |      |
    |      v
    |      EmailJS envoie email d'approbation
    |      |
    |      v
    |      Utilisateur reçoit: "Bienvenue, accès accordé"
    |
    +---> Refuser
           |
           v
           EmailJS envoie email de refus
           |
           v
           Utilisateur reçoit: "Désolé, accès refusé"
```

Configuration EmailJS:

Service ID: service_9i0zjjv
Template Approbation: template_zlwagno
Template Refus: template_1g91sxy
Public Key: 5ewvMGGv9wPHPaZxr

Fichiers concernés:
- src/lib/accessRequestService.ts: Logique d'envoi d'emails
- src/components/AccessRequestModal.tsx: Formulaire de demande
- src/components/AccessRequestDashboard.tsx: Dashboard admin
- src/pages/AdminPage.tsx: Page d'authentification admin

*Configuration Google Analytics*

Google Analytics est intégré pour suivre les visiteurs et leurs interactions.

Flowchart du suivi:

```
Visiteur accède au site
    |
    v
Google Analytics initialise (gtag.js)
    |
    v
Collecte des données:
    | - Nombre de visiteurs
    | - Pages visitées
    | - Temps passé
    | - Appareils utilisés
    | - Interactions (clics, scrolls)
    |
    v
Google Analytics Dashboard
    |
    | Consultable à: https://analytics.google.com/
    |
    v
Rapports en temps réel
```

Configuration:

ID de mesure: G-JPMFE1X5MJ

Fichier de configuration:
- src/App.tsx: Initialisation de gtag.js

Tous les événements sont automatiquement tracés. Pas de configuration supplémentaire nécessaire.

*Configuration EmailJS*

EmailJS gère l'envoi des emails de notification pour les demandes d'accès.

Flowchart du système d'email:

```
Demande soumise
    |
    v
Admin approuve/refuse
    |
    +---> Approuver
    |      |
    |      v
    |      EmailJS déclenche template_zlwagno
    |      |
    |      | Paramètres:
    |      | - to_email: email utilisateur
    |      | - to_name: nom utilisateur
    |      | - project_name: nom du projet
    |      | - linkedin_url
    |      | - github_url
    |      |
    |      v
    |      Email d'approbation envoyé
    |      |
    |      | "Bienvenue! Vous avez accès au projet"
    |      |
    |      v
    |      Utilisateur reçoit email
    |
    +---> Refuser
           |
           v
           EmailJS déclenche template_1g91sxy
           |
           | Paramètres: (identiques)
           |
           v
           Email de refus envoyé
           |
           | "Désolé, votre statut ne permet pas..."
           |
           v
           Utilisateur reçoit email
```

Tester les emails:

1. Allez à http://localhost:8080/
2. Cliquez sur un projet protégé
3. Remplissez le formulaire avec votre email
4. Allez à http://localhost:8080/admin
5. Password: Ahmed2024!Ayoubi
6. Cliquez "Approuver" ou "Refuser"
7. Vérifiez votre email

Vérifiez aussi:
- Dossier spam (si rien n'arrive)
- Dashboard EmailJS: https://dashboard.emailjs.com/

*Newsletter*

La section newsletter permet aux visiteurs de s'abonner pour recevoir les derniers articles.

Flowchart d'abonnement:

```
Visiteur scroll jusqu'au footer
    |
    v
Section Newsletter visible
    |
    | Email: votreemail@example.com
    |
    v
Clique "S'abonner"
    |
    v
Validation:
    | Email valide?
    |
    +--> Non: Erreur affichée
    |
    +--> Oui: Abonnement confirmé
    |
    v
Toast de confirmation
    |
    | "Merci de votre abonnement!"
    |
    v
Email stocké (localStorage actuellement)
    |
    | A connecter à:
    | - Supabase
    | - EmailJS
    | - Mailchimp
```

*Testimonials et Social Proof*

Section montrant les avis de collaborateurs professionnels:

- Youssef BOUYRIG - Head of Insights and Data, Capgemini
- Eric Guillerme - Chef Projet Tech/IA Data, Cikaba
- Julien Ah-Pine - Professeur des Universités, Sigma Clermont Auvergne & LIMOS

*Blog et Articles*

Section avec articles scientifiques et ressources:

1. Transformers: Au-delà des Attention Mechanisms
   - Article: Attention Is All You Need
   - URL: https://arxiv.org/abs/1706.03762
   - Tutoriel: https://arxiv.org/abs/2002.04745

2. Segmentation Sémantique SAR: Défis et Solutions
   - URL: https://www.mdpi.com/2072-4292/17/2/290
   - URL: https://www.sciencedirect.com/science/article/pii/S0034425721001234

3. Transfer Learning en 2025: Best Practices et Pièges Courants
   - URL: https://arxiv.org/abs/1903.01229
   - URL: https://arxiv.org/abs/2102.02770

*Déploiement*

Options de déploiement:

Vercel (Recommandé):
1. Poussez votre code sur GitHub
2. Connectez Vercel à votre repository
3. Configuration automatique avec vite.config.ts
4. Déploiement instantané à chaque push

Netlify:
1. npm run build
2. Déployez le dossier dist/ sur Netlify

GitHub Pages:
1. npm run build
2. Configurez package.json pour GitHub Pages
3. Poussez le dossier dist/ sur la branche gh-pages

Variables d'environnement en production:
- Configurez vos clés EmailJS
- Configurez votre Google Analytics ID
- Configurez les URLs de Supabase

*Architecture et Sécurité*

Sécurité:

- Authentification admin: Mot de passe dans AdminPage.tsx (à améliorer)
- Données: Stockées en localStorage (à migrer vers Supabase en production)
- Emails: Gérés via EmailJS (chiffrement côté EmailJS)
- Validation: Validation côté client (à ajouter côté serveur)

Recommandations:

- Utiliser OAuth (Google, GitHub) pour l'authentification admin
- Migrer les données vers Supabase avec row-level security
- Implémenter rate limiting sur les demandes d'accès
- Ajouter CAPTCHA pour éviter les abus
- Utiliser HTTPS en production

*Sections du Portfolio*

- Hero: Introduction avec typewriter effect
- About: À propos de vous
- Skills: Compétences techniques
- Experience: Expérience professionnelle
- Projects: Portfolio de projets (avec demandes d'accès)
- Testimonials: Avis de collaborateurs
- Blog: Articles et ressources
- CTA: Appel à l'action (télécharger CV, contacter)
- Education: Formation académique
- Contact: Formulaire de contact
- Footer: Newsletter et liens

*Scripts disponibles*

Development:
npm run dev        # Lancer le serveur de développement
npm run lint       # Vérifier la qualité du code
npm run preview    # Prévisualiser la build de production

Production:
npm run build      # Construire pour la production
npm run build:dev  # Build en mode développement

Tests:
npm run test       # Exécuter les tests une fois
npm run test:watch # Tests en mode watch

*Guide de Personnalisation*

Pour personnaliser:

1. Changez le mot de passe admin:
   src/pages/AdminPage.tsx - ligne 18

2. Modifiez les testimonials:
   src/components/TestimonialsSection.tsx

3. Mettez à jour les articles du blog:
   src/components/BlogSection.tsx

4. Personnalisez les textes:
   Modifiez directement les composants React

5. Changez les couleurs et thème:
   tailwind.config.ts et src/index.css

*Ressources et Documentation*

Documentation:
- SETUP_GUIDE.md: Configuration générale
- EMAIL_SETUP_GUIDE.md: Configuration EmailJS détaillée
- EMAILJS_SETUP_COMPLETE.md: Vérification EmailJS

Liens utiles:
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion/
- EmailJS: https://www.emailjs.com
- Google Analytics: https://analytics.google.com
- Shadcn UI: https://ui.shadcn.com

*Contact et Support*

Pour toute question ou clarification:

LinkedIn: https://www.linkedin.com/in/ahmed-ayoubi/
GitHub: https://github.com/Ahmeday-ui
Email: ayoubiahmed02@gmail.com

*Licence*

Ce projet est personnel et à usage personnel.

*Contributeurs*

Développé par Ahmed Ayoubi

Avec support de:
- Youssef BOUYRIG - Capgemini
- Eric Guillerme - Cikaba
- Julien Ah-Pine - LIMOS Lab

*Statut du Projet*

Statut: En production et constamment amélioré
Version: 1.0.0
Dernière mise à jour: 1er avril 2026

Prochaines améliorations:
- Intégration Supabase complète
- Dashboard analytics avancé
- Système de commentaires sur les articles
- Intégration avec les APIs de freelancing
- Multi-langue support
