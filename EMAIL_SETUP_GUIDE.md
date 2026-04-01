# 📧 Configuration du système de demandes d'accès avec emails

## 🎯 Fonctionnalités mises en place

### 1. **Dashboard Admin** (`/admin`)
- 🔐 Authentification avec mot de passe (à personnaliser)
- 📋 Vue d'ensemble des demandes (pending, approved, rejected)
- ✅ Approbation/refus des demandes
- 📊 Statistiques en temps réel
- 🔔 Notifications des nouvelles demandes

### 2. **Système de demandes d'accès**
- Formulaire de demande pour les projets protégés
- Stockage des demandes en localStorage (temporaire)
- Gestion des statuts (pending → approved/rejected)

### 3. **Notifications par email** (À configurer)
- ✅ Approbation: "Bienvenue, vous avez accès au projet"
- ❌ Refus: "Désolé, votre statut ne permet pas..."
- 📬 Newsletter abonnements

---

## ⚙️ Configuration étape par étape

### **Étape 1: Changer le mot de passe admin**

Ouvrez `src/pages/AdminPage.tsx`:

```typescript
// Ligne 18 - Changez ce mot de passe!
const ADMIN_PASSWORD = "Ahmed2024!Ayoubi"; // À changer!
```

Créez un mot de passe fort et unique.

---

### **Étape 2: Intégrer les vrais emails**

Vous avez plusieurs options:

#### **Option A: EmailJS (Recommandé - Facile)**

1. **Créer un compte** sur https://www.emailjs.com/
2. **Copier vos clés** (Service ID, Template ID, User ID)
3. **Installer le package**:
   ```bash
   npm install @emailjs/browser
   ```

4. **Ajouter à `src/lib/accessRequestService.ts`**:
   ```typescript
   import emailjs from '@emailjs/browser';

   emailjs.init("YOUR_PUBLIC_KEY"); // De EmailJS

   export const sendAccessNotification = async (
     email: string,
     name: string,
     project: string,
     status: "approved" | "rejected"
   ): Promise<boolean> => {
     try {
       const templateParams = {
         to_email: email,
         to_name: name,
         project_name: project,
         status: status,
         linkedin_url: "https://www.linkedin.com/in/ahmed-ayoubi/",
         github_url: "https://github.com/Ahmeday-ui",
       };

       const response = await emailjs.send(
         "SERVICE_ID", // De EmailJS
         status === "approved" ? "TEMPLATE_APPROVE_ID" : "TEMPLATE_REJECT_ID",
         templateParams
       );

       return response.status === 200;
     } catch (error) {
       console.error("Erreur EmailJS:", error);
       return false;
     }
   };
   ```

5. **Créer les templates dans EmailJS**:

   **Template: Approbation**
   ```
   Subject: Accès approuvé! 🎉 - Projet {{project_name}}
   
   Bonjour {{to_name}},

   Bienvenue! 🎉 Votre demande d'accès au projet "{{project_name}}" a été approuvée.

   Vous pouvez maintenant accéder à tous les détails du projet.

   N'hésitez pas à me contacter:
   - LinkedIn: {{linkedin_url}}
   - GitHub: {{github_url}}

   Cordialement,
   Ahmed Ayoubi
   ```

   **Template: Refus**
   ```
   Subject: Votre demande d'accès - Projet {{project_name}}
   
   Bonjour {{to_name}},

   Merci de votre intérêt pour le projet "{{project_name}}".

   Désolé, votre statut ne permet pas de vous accéder à des projets d'un impact R&D.

   Cependant, n'hésitez pas à me contacter directement:
   - LinkedIn: {{linkedin_url}}
   - GitHub: {{github_url}}

   Cordialement,
   Ahmed Ayoubi
   ```

#### **Option B: Supabase + Edge Functions**

1. **Créer une table `access_requests`** dans Supabase:
   ```sql
   create table access_requests (
     id uuid primary key default uuid_generate_v4(),
     nom text not null,
     prenom text not null,
     organisation text,
     email text not null,
     project text not null,
     status text default 'pending',
     created_at timestamp default now()
   );
   ```

2. **Créer une Edge Function** pour envoyer les emails:
   ```bash
   supabase functions new send-access-notification
   ```

3. **Code de la fonction** (`send-access-notification`):
   ```typescript
   import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
   import { Resend } from "https://cdn.jsdelivr.net/npm/resend@latest/+esm"

   const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

   serve(async (req) => {
     const { email, name, project, status } = await req.json()

     try {
       const result = await resend.emails.send({
         from: "noreply@ayoubiahmed.com",
         to: email,
         subject: status === "approved" 
           ? `Accès approuvé! 🎉 - Projet ${project}`
           : `Votre demande d'accès - Projet ${project}`,
         html: status === "approved" 
           ? `<h1>Bienvenue!</h1><p>Votre accès a été approuvé...</p>`
           : `<h1>Demande refusée</h1><p>Désolé, votre statut ne permet pas...</p>`
       })

       return new Response(JSON.stringify(result), { status: 200 })
     } catch (error) {
       return new Response(JSON.stringify({ error: error.message }), { status: 400 })
     }
   })
   ```

#### **Option C: Vercel Serverless (Gratuit)**

Créer `api/send-email.js`:
```javascript
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name, project, status } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // App password
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: status === "approved" 
        ? `Accès approuvé! - ${project}` 
        : `Votre demande d'accès - ${project}`,
      html: status === "approved" ? /* ... */ : /* ... */
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

### **Étape 3: Accéder au dashboard admin**

1. Allez à `http://localhost:8080/admin`
2. Entrez votre mot de passe
3. Gérez les demandes d'accès

---

## 📱 Flux utilisateur complet

```
1. Utilisateur clique sur "Accès protégé" sur un projet
   ↓
2. Modal de demande d'accès s'ouvre
   ↓
3. Remplit le formulaire (nom, email, organisation)
   ↓
4. Demande stockée en localStorage (+ notification admin si email intégré)
   ↓
5. Admin va sur /admin et approuve/refuse
   ↓
6. Email envoyé à l'utilisateur:
   - Si approuvé: "Bienvenue, accès accordé"
   - Si refusé: "Désolé, statut non autorisé"
   ↓
7. Utilisateur peut accéder au projet (si approuvé)
```

---

## 🔒 Sécurité

- ✅ Validation des emails
- ✅ Authentification admin (mot de passe)
- ⚠️ À améliorer: Utiliser OAuth (Google, GitHub) pour l'admin
- ⚠️ À améliorer: Hasher les mots de passe en DB

---

## 📊 Données stockées

Les demandes sont actuellement en localStorage. Upgradez à:
- **Supabase** (recommandé - déjà configuré)
- **Firebase Firestore**
- **MongoDB**
- **PostgreSQL**

---

## 🧪 Tester le système

### Sans emails (développement):
1. Aller sur un projet protégé
2. Soumettre une demande
3. Aller à `/admin`
4. Password: `Ahmed2024!Ayoubi`
5. Approuver/refuser la demande
6. Voir les logs dans la console

### Avec emails (production):
Suivez les étapes de configuration ci-dessus

---

## 📝 Personnaliser les messages

Ouvrez `src/components/AccessRequestDashboard.tsx` pour modifier les templates d'emails:

```typescript
// Ligne ~100 - Message d'approbation
const emailContent = `
Bonjour ${request.prenom} ${request.nom},
...
`;

// Ligne ~140 - Message de refus
const emailContent = `
Bonjour ${request.prenom} ${request.nom},
...
`;
```

---

## ✅ Checklist de mise en production

- [ ] Changer le mot de passe admin
- [ ] Configurer EmailJS (ou alternative)
- [ ] Tester les emails
- [ ] Ajouter une vraie base de données (Supabase)
- [ ] Configurer Google Analytics
- [ ] HTTPS enabled
- [ ] Ajouter rate limiting sur les demandes
- [ ] Backup des demandes régulièrement

---

**Besoin d'aide?** Consultez les docs:
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Serverless](https://vercel.com/docs/serverless-functions)
