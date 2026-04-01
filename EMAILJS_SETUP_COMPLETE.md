# 📧 EmailJS Configuration - Vérification

## ✅ Configuration complétée!

EmailJS est maintenant **entièrement configuré** avec vos identifiants:

### 📋 Détails de configuration:

- **Service ID**: `service_9i0zjjv`
- **Template Approbation**: `template_zlwagno`
- **Template Refus**: `template_1g91sxy`
- **Public Key**: `5ewvMGGv9wPHPaZxr`
- **LinkedIn**: https://www.linkedin.com/in/ahmed-ayoubi/
- **GitHub**: https://github.com/Ahmeday-ui

---

## 🧪 Comment tester

### **1. Accédez à un projet protégé**
1. Allez sur `http://localhost:8080/`
2. Scrollez jusqu'à la section **Projets**
3. Cliquez sur l'icône 👁️ (Eye) sur l'un des projets avec "contenu protégé"

### **2. Remplissez le formulaire de demande**
```
Nom: Dupont
Prénom: Jean
Organisation: Ma Boîte
Type: Entreprise
Email: votreemail@exemple.com
```

### **3. Accédez au dashboard admin**
1. Allez à `http://localhost:8080/admin`
2. Entrez le password: `Ahmed2024!Ayoubi`
3. Vous verrez votre demande en attente

### **4. Testez l'approbation**
1. Cliquez sur le bouton **"Approuver"**
2. Attendez quelques secondes (le bouton affiche "Envoi...")
3. Vérifiez votre email fourni
4. ✅ Vous devriez recevoir un email d'approbation!

### **5. Testez le refus**
1. Faites une autre demande
2. Dans le dashboard, cliquez sur **"Refuser"**
3. Vérifiez votre email
4. ❌ Vous devriez recevoir un email de refus!

---

## 📧 Format des emails

### **Email d'Approbation** (template_zlwagno)

Le template EmailJS affichera:
- Votre nom complet
- Le nom du projet
- Invitation à accéder au projet
- Liens vers LinkedIn et GitHub
- Invitation à vous contacter

### **Email de Refus** (template_1g91sxy)

Le template EmailJS affichera:
- Votre nom complet
- Le nom du projet
- Message: "Désolé, votre statut ne permet pas de vous accéder à des projets d'un impact R&D"
- Invitation à vous contacter
- Liens vers LinkedIn et GitHub

---

## 🔍 Vérifier la configuration dans EmailJS

1. Allez sur [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. **Service ID**: `service_9i0zjjv`
   - Vérifiez que le service est actif
3. **Templates**:
   - `template_zlwagno` → Pour les approbations
   - `template_1g91sxy` → Pour les refus
   - Chacun doit utiliser les bonnes variables

---

## ⚙️ Configuration des templates (si vous devez les modifier)

### **Variables disponibles dans les templates:**

```
- to_name: Prénom et Nom du demandeur
- to_email: Email du demandeur
- project_name: Nom du projet
- linkedin_url: Lien LinkedIn (https://www.linkedin.com/in/ahmed-ayoubi/)
- github_url: Lien GitHub (https://github.com/Ahmeday-ui)
- site_name: Ahmed Ayoubi Portfolio
```

### **Exemple de contenu template (template_zlwagno - Approbation)**

```html
<h2>Bienvenue! 🎉</h2>
<p>Bonjour {{to_name}},</p>

<p>Votre demande d'accès au projet <strong>{{project_name}}</strong> a été <strong>approuvée</strong>!</p>

<p>Vous pouvez maintenant accéder à tous les détails du projet sur mon portfolio.</p>

<h3>Restons en contact</h3>
<p>N'hésitez pas à me contacter pour toute clarification ou échange:</p>
<ul>
  <li><a href="{{linkedin_url}}">LinkedIn</a></li>
  <li><a href="{{github_url}}">GitHub</a></li>
</ul>

<p>Cordialement,<br><strong>Ahmed Ayoubi</strong><br>Data Scientist & ML Engineer</p>
```

### **Exemple de contenu template (template_1g91sxy - Refus)**

```html
<h2>Demande d'accès</h2>
<p>Bonjour {{to_name}},</p>

<p>Merci de votre intérêt pour le projet <strong>{{project_name}}</strong>.</p>

<p style="color: #ef4444;"><strong>Désolé</strong>, votre statut ne permet pas de vous accéder à des projets d'un impact R&D.</p>

<h3>Cependant...</h3>
<p>N'hésitez pas à me contacter directement pour discuter d'autres opportunités ou collaborations:</p>
<ul>
  <li><a href="{{linkedin_url}}">LinkedIn</a></li>
  <li><a href="{{github_url}}">GitHub</a></li>
</ul>

<p>Cordialement,<br><strong>Ahmed Ayoubi</strong><br>Data Scientist & ML Engineer</p>
```

---

## 🐛 Troubleshooting

### **Les emails ne sont pas envoyés**

1. **Vérifiez la console du navigateur** (F12)
   - Cherchez les messages d'erreur EmailJS
   
2. **Vérifiez votre configuration EmailJS**
   - Le Service ID est correct?
   - Les Template IDs sont corrects?
   - La Public Key est correcte?

3. **Vérifiez le compte EmailJS**
   - Allez sur https://dashboard.emailjs.com/
   - Le plan gratuit permet 200 emails/mois

4. **Vérifiez les logs**
   ```
   Ouvrez DevTools (F12) → Console
   Vous devriez voir: "Email approved/rejected envoyé à [email]"
   ```

### **Les emails sont marqués comme spam**

- Vérifiez le filtre spam de votre email
- Ajoutez l'adresse no-reply@emailjs.com à vos contacts

### **Erreur 400 ou 401**

- Les identifiants ne sont pas corrects
- Vérifiez dans `/src/lib/accessRequestService.ts`:
  ```typescript
  const EMAILJS_PUBLIC_KEY = "5ewvMGGv9wPHPaZxr";
  const EMAILJS_SERVICE_ID = "service_9i0zjjv";
  const EMAILJS_TEMPLATE_APPROVE = "template_zlwagno";
  const EMAILJS_TEMPLATE_REJECT = "template_1g91sxy";
  ```

---

## 📊 Suivi des emails

### **Voir l'historique des emails dans EmailJS**

1. Allez sur https://dashboard.emailjs.com/
2. Cliquez sur **"Email Activity"**
3. Vous verrez tous les emails envoyés avec statut (success/failed)

---

## 🎯 Flux complet (vue d'ensemble)

```
USER
  ↓
Clique sur projet protégé
  ↓
Remplir formulaire + email
  ↓
Demande stockée en localStorage
  ↓
        │
        ├→ ADMIN
           ↓
           Visite /admin
           ↓
           Approuve la demande
           ↓
           EmailJS envoie email d'approbation
           ↓
        USER (reçoit email approuvé)
           ↓
           Peut accéder au projet
```

---

## ✨ C'est prêt!

Votre système d'accès aux projets avec notifications email est maintenant **100% fonctionnel**. Testez-le et bon courage! 🚀

---

**Questions?** Consultez:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Template Variables](https://www.emailjs.com/docs/user-guide/template-variables/)
