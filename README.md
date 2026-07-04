# Pro Informatique - Web Panel

## Description

Panel web Next.js pour Pro Informatique, offrant une interface publique pour les clients et un panel d'administration pour la gestion des services, produits, promotions et utilisateurs.

## Technologies

- **Next.js 14** - Framework React avec App Router
- **React** - Bibliothèque UI
- **TypeScript** - Typage statique
- **TailwindCSS** - Framework CSS
- **Vercel** - Déploiement cloud

## Fonctionnalités

### Mode Public (Invité)
- Accès complet au site sans création de compte
- Page d'accueil avec présentation de la boutique
- Navigation vers les services et produits
- Consultation des promotions en cours

### Panel Admin
- Connexion sécurisée avec email/mot de passe
- Dashboard avec statistiques
- Gestion CRUD complète des services
- Gestion CRUD complète des produits
- Gestion CRUD complète des promotions
- Gestion des utilisateurs (rôles, suppression)

### Authentification
- Inscription admin
- Connexion admin
- Déconnexion
- Toggle entre inscription et connexion

## Structure du Projet

```
app/
├── page.tsx                  # Page d'accueil publique
├── services/
│   └── page.tsx             # Page publique des services
├── products/
│   └── page.tsx             # Page publique des produits
├── admin/
│   ├── page.tsx             # Dashboard admin
│   ├── services/
│   │   └── page.tsx         # Gestion admin des services
│   ├── products/
│   │   └── page.tsx         # Gestion admin des produits
│   ├── promotions/
│   │   └── page.tsx         # Gestion admin des promotions
│   └── users/
│       └── page.tsx         # Gestion admin des utilisateurs
components/
├── AuthContext.tsx          # Contexte d'authentification
├── AuthGuard.tsx            # Guard pour routes admin
lib/
└── api.ts                   # Fonctions API
```

## Pages

### Page d'accueil (`/`)
- Hero section avec présentation
- Aperçu des services (3 services)
- Aperçu des produits (4 produits)
- Boutons de navigation
- Lien vers le panel admin

### Services (`/services`)
- Grille de tous les services
- Affichage des fonctionnalités
- Prix affichés
- Catégorisation
- CTA pour contact

### Produits (`/products`)
- Grille de tous les produits
- Images des produits
- Prix affichés
- Catégories
- CTA pour contact

### Dashboard Admin (`/admin`)
- Statistiques (nombre de services, produits, promotions)
- Liens vers toutes les sections admin
- Lien vers le site public
- Header avec utilisateur connecté et déconnexion

### Gestion Services Admin (`/admin/services`)
- Liste des services avec tableau
- Formulaire de création/modification
- Champs : titre, description, catégorie, prix
- Actions : modifier, supprimer

### Gestion Produits Admin (`/admin/products`)
- Liste des produits avec tableau
- Formulaire de création/modification
- Champs : nom, description, catégorie, prix, URL image
- Actions : modifier, supprimer

### Gestion Promotions Admin (`/admin/promotions`)
- Liste des promotions avec tableau
- Formulaire de création/modification
- Champs : titre, description, URL image
- Actions : modifier, supprimer

### Gestion Utilisateurs Admin (`/admin/users`)
- Liste des utilisateurs avec tableau
- Modification des rôles (user/admin)
- Suppression d'utilisateurs
- Affichage de la date de création

## Configuration

### API URL

L'URL de l'API est configurée dans `lib/api.ts` :

```typescript
const API_BASE_URL = 'https://api.proinformatique.dev';
```

### Authentification

L'authentification utilise un contexte React (`AuthContext`) :

```typescript
const { user, login, register, logout } = useAuth();
```

### Routes Protégées

Les routes admin sont protégées par `AuthGuard` :

```tsx
<AuthGuard>
  {/* Contenu admin */}
</AuthGuard>
```

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

## Déploiement

### Vercel

Le projet est configuré pour Vercel. Pour déployer :

```bash
vercel --prod
```

## API Functions

Les fonctions API sont définies dans `lib/api.ts` :

```typescript
// Services
getServices()
createService(service)
updateService(id, service)
deleteService(id)

// Produits
getProducts()
createProduct(product)
updateProduct(id, product)
deleteProduct(id)

// Promotions
getPromotions()
createPromotion(promotion)
updatePromotion(id, promotion)
deletePromotion(id)

// Authentification
login(email, password)
register(name, email, password)

// Utilisateurs
getUsers()
deleteUser(id)
updateUserRole(id, role)
```

## Styles

Le projet utilise TailwindCSS avec des couleurs personnalisées définies dans `globals.css` :

```css
:root {
  --primary: #6C63FF;
  --secondary: #2A2D3E;
  --background: #F5F7FA;
  --surface: #FFFFFF;
  --surface-muted: #F0F2F5;
  --border: #E5E7EB;
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --card-pink: #FF6B9D;
}
```

## Sécurité

- Les routes admin sont protégées par AuthGuard
- L'authentification utilise des tokens simples (à améliorer avec JWT)
- Pas de validation côté serveur des rôles (à ajouter)
- CORS configuré pour accepter toutes les origines (à restreindre)

## Améliorations Futures

- [ ] JWT pour l'authentification
- [ ] Validation des rôles côté serveur
- [ ] Rate limiting
- [ ] Logs d'activité admin
- [ ] Export de données
- [ ] Mode sombre
- [ ] Localisation multi-langue
- [ ] Tests E2E
- [ ] Intégration CI/CD

## Support

Pour toute question ou problème, contactez l'équipe de développement.
