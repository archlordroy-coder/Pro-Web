# Guide d'Utilisation - Pro Informatique Web Panel

Ce guide explique comment utiliser les nouveaux composants et hooks du projet.

## Table des matières

1. [Composants Admin](#composants-admin)
2. [Composants Publics](#composants-publics)
3. [Hooks](#hooks)
4. [Contextes](#contextes)
5. [Utilitaires](#utilitaires)
6. [Exemples Complets](#exemples-complets)

---

## Composants Admin

### AdminForm

Formulaire générique pour créer/modifier des données avec validation intégrée.

**Usage:**
```tsx
import { AdminForm, type FormField } from '@/components';

const fields: FormField[] = [
  { name: 'title', label: 'Titre', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'price', label: 'Prix', type: 'number' },
];

export function MyForm() {
  const [data, setData] = useState({});

  return (
    <AdminForm
      title="Nouveau produit"
      fields={fields}
      data={data}
      onDataChange={(field, value) => setData(prev => ({ ...prev, [field]: value }))}
      onSubmit={async () => { /* save */ }}
      onCancel={() => { /* cancel */ }}
      submitLabel="Créer"
    />
  );
}
```

### AdminTable

Table générique avec actions edit/delete.

**Usage:**
```tsx
import { AdminTable, type TableColumn } from '@/components';

const columns: TableColumn[] = [
  { key: 'name', label: 'Nom' },
  { key: 'price', label: 'Prix', render: (v) => `${v} FCFA` },
];

export function MyTable({ items }) {
  return (
    <AdminTable
      columns={columns}
      data={items}
      onEdit={(item) => { /* edit */ }}
      onDelete={(id) => { /* delete */ }}
      loading={false}
    />
  );
}
```

### AdminHeader

En-tête pour les pages admin avec titre et bouton d'action.

**Usage:**
```tsx
import { AdminHeader } from '@/components';

<AdminHeader
  title="Gestion des Produits"
  description="Créer et modifier les produits"
  action={{ label: '+ Nouveau', onClick: () => {} }}
/>
```

---

## Composants Publics

### PublicLayout

Layout réutilisable pour les pages publiques (inclut Header et Footer).

**Usage:**
```tsx
import { PublicLayout } from '@/components';

export default function MyPage() {
  return (
    <PublicLayout title="Titre de page" description="Description">
      <p>Contenu de la page</p>
    </PublicLayout>
  );
}
```

### HeroSection

Section d'accueil avec titre, sous-titre et actions.

**Usage:**
```tsx
import { HeroSection } from '@/components';

<HeroSection
  title="Bienvenue"
  subtitle="Découvrez nos services"
  primaryAction={{ label: 'Commencer', href: '/services' }}
  secondaryAction={{ label: 'En savoir plus', href: '#' }}
/>
```

### PublicHeader / PublicFooter

Composants standalone pour navigation et footer.

**Usage:**
```tsx
import { PublicHeader, PublicFooter } from '@/components';

export default function Layout({ children }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  );
}
```

---

## Composants d'État

### Skeleton

Loaders pour les états de chargement.

**Usage:**
```tsx
import { CardSkeleton, TableSkeleton, ImageSkeleton } from '@/components';

{loading ? <CardSkeleton /> : <Card data={data} />}
```

### EmptyState / ErrorState / LoadingState

États informatifs.

**Usage:**
```tsx
import { EmptyState, ErrorState, LoadingState } from '@/components';

{!items?.length && (
  <EmptyState
    title="Aucune donnée"
    description="Créez le premier élément"
    action={{ label: 'Créer', onClick: () => {} }}
  />
)}
```

---

## Composants de Formulaire

### SearchBar

Barre de recherche avec icônes et bouton clear.

**Usage:**
```tsx
import { SearchBar } from '@/components';

<SearchBar
  value={query}
  onChange={setQuery}
  placeholder="Rechercher..."
  onClear={() => setQuery('')}
/>
```

### Pagination

Navigation entre pages.

**Usage:**
```tsx
import { Pagination } from '@/components';

<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  canPrev={page > 1}
  canNext={page < totalPages}
/>
```

---

## Hooks

### useAsync

Gère les appels asynchrones avec états.

**Usage:**
```tsx
import { useAsync } from '@/hooks';

const { data, loading, error, execute } = useAsync(
  async () => await fetchData(),
  true // immediate
);

if (loading) return <LoadingState />;
if (error) return <ErrorState message={error.message} />;
return <Component data={data} />;
```

### useLocalStorage

Synchronise l'état avec localStorage.

**Usage:**
```tsx
import { useLocalStorage } from '@/hooks';

const [preferences, setPreferences, clear, isLoaded] = useLocalStorage('prefs', {});

// Utiliser comme useState
setPreferences({ theme: 'dark' });
```

### usePagination

Gère la pagination côté client.

**Usage:**
```tsx
import { usePagination } from '@/hooks';

const pagination = usePagination(items, 10);

return (
  <>
    {pagination.paginatedItems.map(item => (...))}
    <Pagination
      currentPage={pagination.currentPage}
      totalPages={pagination.totalPages}
      onPageChange={pagination.goToPage}
      canNext={pagination.hasNextPage}
      canPrev={pagination.hasPrevPage}
    />
  </>
);
```

### useFilter

Filtre les éléments avec un prédicat.

**Usage:**
```tsx
import { useFilter } from '@/hooks';

const { filteredItems, query, setQuery } = useFilter(
  items,
  (item, query) => item.name.toLowerCase().includes(query),
  ''
);

return (
  <>
    <SearchBar value={query} onChange={setQuery} />
    {filteredItems.map(item => (...))}
  </>
);
```

### useNotification

Hook pour afficher des notifications.

**Usage:**
```tsx
import { useNotification } from '@/hooks';

const { addNotification } = useNotification();

const handleSave = async () => {
  try {
    await save();
    addNotification('success', 'Sauvegardé!');
  } catch (error) {
    addNotification('error', 'Erreur: ' + error.message);
  }
};
```

### useAuth

Hook pour accéder à l'authentification.

**Usage:**
```tsx
import { useAuth } from '@/hooks';

const { user, token, login, logout } = useAuth();

if (!user) return <LoginForm />;
return <Dashboard user={user} />;
```

---

## Contextes

### NotificationProvider

Doit envelopper l'app pour les notifications.

```tsx
// Dans app/layout.tsx
<NotificationProvider>
  <AuthProvider>
    <NotificationContainer />
    {children}
  </AuthProvider>
</NotificationProvider>
```

### AuthProvider

Gère l'authentification et la persistance.

```tsx
// Déjà configuré dans layout.tsx
```

---

## Utilitaires API

### api-utils.ts

Outils pour gérer l'API:

```tsx
import {
  getCachedData,
  setCachedData,
  getErrorMessage,
  retryAsync,
  debounce,
} from '@/lib/api-utils';

// Caching
const data = getCachedData('products');
if (!data) {
  const fresh = await fetchProducts();
  setCachedData('products', fresh);
}

// Retry
const data = await retryAsync(() => fetchData(), 3, 1000);

// Debounce
const debouncedSearch = debounce((query) => search(query), 300);

// Error handling
try {
  await api();
} catch (error) {
  const msg = getErrorMessage(error);
  addNotification('error', msg);
}
```

### config.ts

Configuration centralisée:

```tsx
import { config, messages, routes } from '@/lib/config';

console.log(config.api.baseUrl);
console.log(messages.errors.invalidEmail);
console.log(routes.admin.products);
```

---

## Exemples Complets

### Exemple 1: Page CRUD Simple

```tsx
'use client';

import { useState, useEffect } from 'react';
import { AdminHeader, AdminForm, AdminTable } from '@/components';
import { useNotification } from '@/hooks';

export default function ProductsPage() {
  const { addNotification } = useNotification();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await fetch('/api/products').then(r => r.json());
      setItems(data);
    } catch (error) {
      addNotification('error', 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await fetch(`/api/products/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        addNotification('success', 'Mis à jour');
      } else {
        await fetch('/api/products', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        addNotification('success', 'Créé');
      }
      setEditingId(null);
      setFormData({});
      loadItems();
    } catch (error) {
      addNotification('error', 'Erreur de sauvegarde');
    }
  };

  return (
    <div className="p-8">
      <AdminHeader title="Produits" action={{
        label: '+ Nouveau',
        onClick: () => { setEditingId(null); setFormData({}); }
      }} />

      <AdminForm
        title={editingId ? 'Modifier' : 'Créer'}
        fields={[
          { name: 'name', label: 'Nom', type: 'text', required: true },
          { name: 'price', label: 'Prix', type: 'number', required: true },
        ]}
        data={formData}
        onDataChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
        onSubmit={handleSave}
        onCancel={() => { setEditingId(null); setFormData({}); }}
      />

      <AdminTable
        columns={[
          { key: 'name', label: 'Nom' },
          { key: 'price', label: 'Prix' },
        ]}
        data={items}
        onEdit={(item) => { setEditingId(item.id); setFormData(item); }}
        onDelete={async (id) => {
          await fetch(`/api/products/${id}`, { method: 'DELETE' });
          addNotification('success', 'Supprimé');
          loadItems();
        }}
        loading={loading}
      />
    </div>
  );
}
```

### Exemple 2: Page avec Recherche et Pagination

```tsx
'use client';

import { useState, useMemo } from 'react';
import { SearchBar, Pagination } from '@/components';
import { useFilter, usePagination } from '@/hooks';

export default function ProductsListPage() {
  const [items, setItems] = useState([...]);

  const { filteredItems, query, setQuery } = useFilter(
    items,
    (item, q) => item.name.toLowerCase().includes(q)
  );

  const pagination = usePagination(filteredItems, 10);

  return (
    <div className="space-y-4">
      <SearchBar value={query} onChange={setQuery} />

      <div className="grid">
        {pagination.paginatedItems.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={pagination.goToPage}
        canPrev={pagination.hasPrevPage}
        canNext={pagination.hasNextPage}
      />
    </div>
  );
}
```

---

## Bonnes Pratiques

1. **Toujours envelopper avec les Providers**
   - AuthProvider et NotificationProvider doivent être dans le layout racine

2. **Utiliser les hooks personnalisés**
   - `useAsync` pour les appels API
   - `usePagination` pour les grandes listes
   - `useFilter` pour la recherche

3. **Notifications pour le feedback**
   - Success après action réussie
   - Error avec message clair
   - Loading states avec skeletons

4. **Composants réutilisables**
   - Préférer AdminForm/AdminTable plutôt que HTML brut
   - Utiliser Skeletons pour les états de chargement
   - Utiliser EmptyState pour aucune donnée

5. **Gestion des erreurs**
   - Toujours utiliser try/catch
   - Afficher messages utilisateur clairs
   - Logger les erreurs pour debug

---

## Troubleshooting

### Les notifications n'apparaissent pas
✓ Vérifier que `NotificationContainer` est dans le layout
✓ Vérifier que `NotificationProvider` enveloppe l'app

### L'authentification ne persiste pas
✓ Vérifier que `AuthProvider` est dans le layout
✓ Vérifier la console pour les erreurs localStorage

### Types TypeScript manquants
✓ Vérifier les imports des types (`import { type FormField }`)
✓ Nettoyer `.next` et rebuild

---

## Ressources

- [Documentation Next.js 16](https://nextjs.org/)
- [Documentation TypeScript](https://www.typescriptlang.org/)
- [Documentation Tailwind CSS v4](https://tailwindcss.com/)

---

**Dernière mise à jour**: Décembre 2024
