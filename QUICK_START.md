# Quick Start - Pro Informatique

Démarrez rapidement avec le projet Pro Informatique amélioré.

## ⚡ Installation (30 secondes)

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:3000
```

## 🔐 Première Utilisation

1. **Accéder à l'admin**: http://localhost:3000/admin
2. **Créer un compte**: Cliquer sur "Créer un compte"
3. **Se connecter**: Utiliser vos credentials
4. **Gérer les produits**: Aller à `/admin/products`
5. **Gérer les services**: Aller à `/admin/services`

## 📝 Modifier les Données

### Ajouter un produit
1. Aller à `/admin/products`
2. Cliquer sur "+ Nouveau produit"
3. Remplir le formulaire
4. Cliquer "Créer"
5. Voir la notification de succès

### Modifier un service
1. Aller à `/admin/services`
2. Cliquer "Modifier" sur le service
3. Changer les données
4. Cliquer "Mettre à jour"

### Supprimer un élément
1. Cliquer "Supprimer"
2. Confirmer la suppression
3. Voir la notification de succès

## 🎨 Personnaliser le Design

### Couleurs principales
Éditer `/app/globals.css`:
```css
--color-primary: #2B2E83;      /* Bleu principal */
--color-secondary: #076633;    /* Vert secondaire */
--color-accent: #009FE3;       /* Bleu accent */
```

### Font
Éditer `/app/layout.tsx`:
```tsx
import { YourFont } from 'next/font/google';
const font = YourFont({ subsets: ['latin'] });
```

### Logo
Remplacer le texte par une image dans `PublicHeader.tsx`.

## 📦 Ajouter une Nouvelle Page Admin

```tsx
// app/admin/users/page.tsx
'use client';

import { AdminHeader, AdminForm, AdminTable } from '@/components';
import { useNotification } from '@/hooks';
import { useState, useEffect } from 'react';

export default function UsersPage() {
  const { addNotification } = useNotification();
  const [users, setUsers] = useState([]);

  const handleSave = async () => {
    try {
      // Save user
      addNotification('success', 'Utilisateur créé');
    } catch (error) {
      addNotification('error', 'Erreur lors de la création');
    }
  };

  return (
    <div className="p-8">
      <AdminHeader title="Utilisateurs" />
      {/* Ajouter vos composants */}
    </div>
  );
}
```

## 🔌 Connecter une API Externe

Éditer `/lib/api.ts`:
```tsx
const API_BASE_URL = 'https://votre-api.com';
```

## 🧪 Tester

```bash
# Build test
npm run build

# Lint test
npm run lint

# Dev mode
npm run dev
```

## 📚 Documentation

- **[IMPROVEMENTS.md](./IMPROVEMENTS.md)** - Détails techniques complets
- **[USAGE_GUIDE.md](./USAGE_GUIDE.md)** - Guide complet des composants
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Vue d'ensemble du projet

## 🐛 Problèmes Courants

### ❌ Port 3000 déjà utilisé
```bash
npm run dev -- -p 3001
```

### ❌ Erreur localStorage
```
Supprimer les données stockées dans DevTools > Application > localStorage
```

### ❌ Import manquant
```bash
npm install
```

### ❌ Erreur TypeScript
```bash
rm -rf .next && npm run build
```

## 💡 Tips & Tricks

### Importer depuis index.ts
```tsx
// ✅ Recommended
import { AdminForm, AdminTable } from '@/components';

// ❌ Avoid
import { AdminForm } from '@/components/AdminForm';
```

### Utiliser les notifications
```tsx
const { addNotification } = useNotification();

addNotification('success', 'Opération réussie!');
addNotification('error', 'Une erreur est survenue');
addNotification('info', 'Information');
addNotification('warning', 'Attention!');
```

### Créer un formulaire
```tsx
const [data, setData] = useState({});

<AdminForm
  title="Nouveau produit"
  fields={[
    { name: 'name', label: 'Nom', type: 'text', required: true },
  ]}
  data={data}
  onDataChange={(field, value) => setData(prev => ({ ...prev, [field]: value }))}
  onSubmit={async () => { /* save */ }}
  onCancel={() => setData({})}
/>
```

## 🚀 Déploiement

### Sur Vercel
```bash
# Push vers GitHub
git push origin main

# Déployer depuis Vercel Dashboard
# https://vercel.com/dashboard
```

### Sur un serveur custom
```bash
# Build
npm run build

# Start
npm run start
```

## 📧 Variables d'Environnement

Créer `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

## ⚙️ Configuration Avancée

Voir `lib/config.ts` pour:
- Durée du cache API
- Taille des pages
- Durée des notifications
- Validation des formulaires
- Messages d'erreur personnalisés

## 🎓 Apprendre Plus

1. Lire [USAGE_GUIDE.md](./USAGE_GUIDE.md)
2. Explorer `/components` et `/hooks`
3. Étudier les pages existantes
4. Consulter la documentation Next.js

## 🤝 Support

- 📖 Lire la documentation
- 🔍 Vérifier la console du navigateur
- 💬 Créer une issue sur GitHub

---

**Bon développement! 🚀**
