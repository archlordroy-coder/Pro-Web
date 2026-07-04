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

### URL de Production

Le web panel est accessible à l'adresse suivante :
```
https://proinformatique.dev
```

### Configuration des Variables d'Environnement sur Vercel

Le web panel n'a pas besoin de variables d'environnement spécifiques car l'URL de l'API est configurée directement dans le code.

## Utilisation de l'API

### Configuration

Le web panel utilise l'API backend via le fichier `lib/api.ts` :

```typescript
const API_BASE_URL = 'https://api.proinformatique.dev';
```

### Architecture des Appels API

Le web panel suit une architecture simple pour les appels API :

1. **API Functions** (`lib/api.ts`) :
   - Contient toutes les fonctions pour communiquer avec l'API
   - Gère les requêtes HTTP avec fetch
   - Exemple :
   ```typescript
   export async function getServices(): Promise<Service[]> {
     const response = await fetch(`${API_BASE_URL}/services`);
     if (!response.ok) throw new Error('API error');
     return response.json();
   }
   ```

2. **AuthContext** (`components/AuthContext.tsx`) :
   - Gère l'état d'authentification
   - Stocke l'utilisateur et le token
   - Fournit les fonctions login, register, logout
   - Exemple :
   ```typescript
   const login = async (email: string, password: string) => {
     const response = await fetch(`${API_BASE_URL}/auth/login`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     });
     const data = await response.json();
     setUser(data.user);
     setToken(data.token);
   };
   ```

3. **AuthGuard** (`components/AuthGuard.tsx`) :
   - Protège les routes admin
   - Affiche le formulaire de connexion si non authentifié
   - Redirige vers le contenu si authentifié

### Endpoints Utilisés

Le web panel utilise les endpoints suivants de l'API :

- **GET /services** : Récupérer la liste des services (public et admin)
- **POST /services** : Créer un nouveau service (admin)
- **PUT /services/:id** : Mettre à jour un service (admin)
- **DELETE /services/:id** : Supprimer un service (admin)
- **GET /products** : Récupérer la liste des produits (public et admin)
- **POST /products** : Créer un nouveau produit (admin)
- **PUT /products/:id** : Mettre à jour un produit (admin)
- **DELETE /products/:id** : Supprimer un produit (admin)
- **GET /promotions** : Récupérer les promotions (admin)
- **POST /promotions** : Créer une promotion (admin)
- **PUT /promotions/:id** : Mettre à jour une promotion (admin)
- **DELETE /promotions/:id** : Supprimer une promotion (admin)
- **POST /auth/register** : Créer un compte admin
- **POST /auth/login** : Connexion admin
- **GET /users** : Récupérer tous les utilisateurs (admin)
- **DELETE /users/:id** : Supprimer un utilisateur (admin)
- **PUT /users/:id/role** : Modifier le rôle d'un utilisateur (admin)

### Intégration avec le Backend

Pour intégrer le web panel avec le backend :

1. **Configurer l'URL de l'API** dans `lib/api.ts` :
   ```typescript
   const API_BASE_URL = 'https://api.proinformatique.dev';
   ```

2. **Créer les types TypeScript** dans `lib/api.ts` :
   ```typescript
   export interface Service {
     id: string;
     title: string;
     description: string;
     iconCode?: number;
     features?: string[];
     category?: string;
     priceDisplay?: string;
   }
   ```

3. **Implémenter les fonctions API** dans `lib/api.ts` :
   ```typescript
   export async function getServices(): Promise<Service[]> {
     const response = await fetch(`${API_BASE_URL}/services`);
     if (!response.ok) throw new Error('API error');
     return response.json();
   }
   ```

4. **Utiliser dans les composants** :
   ```typescript
   import { getServices } from '@/lib/api';

   export default function ServicesPage() {
     const [services, setServices] = useState<Service[]>([]);
     
     useEffect(() => {
       getServices().then(setServices);
     }, []);

     return (
       <div>
         {services.map(service => (
           <div key={service.id}>{service.title}</div>
         ))}
       </div>
     );
   }
   ```

### Gestion des Erreurs

Le web panel gère les erreurs de manière gracieuse :

- Les erreurs API affichent un message d'erreur à l'utilisateur
- Les formulaires admin affichent les erreurs de validation
- Les erreurs d'authentification redirigent vers le formulaire de connexion

### Mode Public vs Admin

Le web panel sépare clairement les modes :

- **Mode Public** : Accessible sans authentification
  - Page d'accueil (`/`)
  - Services (`/services`)
  - Produits (`/products`)

- **Mode Admin** : Protégé par AuthGuard
  - Dashboard (`/admin`)
  - Gestion services (`/admin/services`)
  - Gestion produits (`/admin/products`)
  - Gestion promotions (`/admin/promotions`)
  - Gestion utilisateurs (`/admin/users`)

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
